import {Component, NgZone, OnInit} from 'angular2/core';
import {DataServices} from './services.ts';

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
export class AppComponent implements OnInit {
    
    _lista : any;
        
    constructor(private gDataServ : DataServices) {
    }

    ngOnInit() {
        this._lista = this.gDataServ.getData();
    }      
     
    adicionar(nome) {
        nome && this._lista.push(nome)
    }
    
}

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