# Setup

Essas são as libraries necessárias (typescript é opcional):
    
    <script src="https://code.angularjs.org/2.0.0-beta.0/angular2-polyfills.js"></script>
    <script src="https://code.angularjs.org/tools/system.js"></script>
    <script src="https://code.angularjs.org/tools/typescript.js"></script>
    <script src="https://code.angularjs.org/2.0.0-beta.0/Rx.js"></script>
    <script src="https://code.angularjs.org/2.0.0-beta.0/angular2.dev.js"></script>
            
A fim de facilitar o trabalho, estou usando o template package.json fornecido no site do Angular 2.

    {
    "name": "angular2-quickstart",
    "version": "1.0.0",
    "scripts": {
        "tsc": "tsc",
        "tsc:w": "tsc -w",
        "lite": "lite-server",
        "start": "concurrent \"npm run tsc:w\" \"npm run lite\" "
    },
    "license": "ISC",
    "dependencies": {
        "angular2": "2.0.0-beta.0",
        "systemjs": "0.19.6",
        "es6-promise": "^3.0.2",
        "es6-shim": "^0.33.3",
        "reflect-metadata": "0.1.2",
        "rxjs": "5.0.0-beta.0",
        "zone.js": "0.5.10"
    },
    "devDependencies": {
        "concurrently": "^1.0.0",
        "lite-server": "^1.3.1",
        "typescript": "^1.7.3"
     }
    }
    
Além do arquivo tsconfig.json:

    {
    "compilerOptions": {
        "target": "ES5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false
    },
    "exclude": [
        "node_modules"
    ]
    }
    

# Iniciando os módulos

O padrão é configurar o SystemJS usando o diretório /app com arquivos .js:

      System.config({
        packages: {        
          app: {
            format: 'register',
            defaultExtension: 'js'
          }
        }
      });
      System.import('app/boot')
            .then(null, console.error.bind(console));

Segue uma configuração usando o Typescript direto:

      System.config({
        transpiler: 'typescript', 
        typescriptOptions: { emitDecoratorMetadata: true }, 
        packages: {'src': {defaultExtension: 'ts'}} 
      });
      System.import('src/boot')
            .then(null, console.error.bind(console)); 

# Startup (Bootstrap)
            
O conteúdo do arquivo boot.ts é simples:

    import {bootstrap} from 'angular2/platform/browser'
    import {AppComponent} from './app.component'

    bootstrap(AppComponent);

# Componente

Onde definimos o componente AppComponent no app.ts:

    import {Component} from 'angular2/core';

    @Component({
        // HTML template
    })
    export class AppComponent {
        // data
    }
    
Uma implementação simples:

    <my-app>Loading...</my-app>
    
Poderia ser implementado:

    @Component({
        // HTML template
        selector: 'my-app',
        template: '<div>{{myprop}}</div>'
    })
    export class AppComponent {
        // data
        myprop = "Hello World";
    }

# Template

O template pode ser customizado:

Interpolation:

    <div>{{myprop}}! Esse botão foi clicado {{count}} vezes</div>

One-way Binding:
        
    <div [class.azul]="azul">Alternado</div>

Eventos:
        
    <button (click)="onclick()">Click</button>
        
Two-way binding:

    <input [(ngModel)]="modelo">
    
# Diretivas ng

Vamos supor que queremos construir uma lista: 

    <input placeholder="[Digite o nome]"><button>Adicionar</button>
    <ul>
        <li>Nome 1
        <li>Nome 2
        <li>Nome 3
    </ul>
    
Esse é o código:

    lista = [];
    
    adicionar(nome) {
        this.lista.push(nome)
    }
    
O resultado pode ser:

    import {Component} from 'angular2/core';

    @Component({
        // HTML template
        selector: 'my-app',
        template: `
            <input #novo placeholder="[Digite o nome]"><button (click)="adicionar(novo.value);">Adicionar</button>
            <ul>
                <li *ngFor="#nome of lista">{{nome}}
            </ul>
            `,
            
        styles: ['.azul { background-color: lightblue }']
    })
    export class AppComponent {
        
        lista = [1,2,3];
        
        adicionar(nome) {
            nome && this.lista.push(nome)
        }
        
    }    
    
# Timer

    @Component({
        selector: 'current-time',
        template: '<span>{{ currentTime | date:"mediumTime" }}</span>'
    })
    export class TimerComponent {
        constructor(private _ngzone: NgZone) {

            var that = this;
            setInterval( () => this.updateTimeNgZone() , 1000);
            
        }
        currentTime = Date.now();
        
        updateTime() {
            this.currentTime = Date.now();
        }
        
        updateTimeNgZone() {
            this._ngzone.run( () => this.updateTime() );
        }
    }    
    
    
# Services

A ideia é ter uma classe de servicos (singleton):

    export class DataServices {
    
        getData() {
            return [1,2,3,4,5];
        }   
        
    }    
    
Injection:

    import {DataServices} from './services';

    bootstrap(AppComponent, [DataServices]);
    
Consumo:

    constructor(private gDataServ : DataServices) {        
        this.lista = gDataServ.getData();
    }

Ou melhor, usando ngOnInit:

    export class AppComponent implements OnInit {
        
        _lista : any;
            
        constructor(private gDataServ : DataServices) {
        }

        ngOnInit() {
            this._lista = this.gDataServ.getData();
        }    