System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var HeroInternals, HeroServices, HeroServices2, AppHeader, EditableText, AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HeroInternals = (function () {
                function HeroInternals() {
                }
                HeroInternals.prototype.getHeroes = function () {
                    return ['SuperA', 'SuperB', 'SuperC'];
                };
                return HeroInternals;
            })();
            exports_1("HeroInternals", HeroInternals);
            HeroServices = (function () {
                function HeroServices() {
                }
                HeroServices.prototype.getHeroes = function () {
                    return ['a'];
                    //return this.h.getHeroes();
                };
                return HeroServices;
            })();
            exports_1("HeroServices", HeroServices);
            HeroServices2 = (function () {
                //h = new HeroInternals();
                function HeroServices2() {
                }
                HeroServices2.prototype.getHeroes = function () {
                    return ['a'];
                    //return this.h.getHeroes();
                };
                return HeroServices2;
            })();
            exports_1("HeroServices2", HeroServices2);
            AppHeader = (function () {
                function AppHeader() {
                }
                AppHeader = __decorate([
                    core_1.Component({
                        selector: 'header',
                        template: '<h1>Header</h1>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppHeader);
                return AppHeader;
            })();
            exports_1("AppHeader", AppHeader);
            EditableText = (function () {
                function EditableText() {
                    this.mode = true;
                    this.value = 'text to be edited (1)';
                    this.change = function (newval) {
                        this.value = newval;
                        this.mode = (!this.mode);
                    };
                }
                EditableText = __decorate([
                    core_1.Component({
                        selector: 'edit',
                        template: "\n    <span *ngIf=\"mode\" (click)=\"change(value)\">{{value}}</span>\n    <input *ngIf=\"!mode\" [(value)]=\"value\" #input\n        (keyup.enter)=\"change(input.value)\" (blur)=\"change(input.value)\">\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], EditableText);
                return EditableText;
            })();
            exports_1("EditableText", EditableText);
            AppComponent = (function () {
                function AppComponent(heroServices, h1, zone) {
                    this.zone = zone;
                    this.msgcount = 0;
                    this.msgatrasada = "...carregando...";
                    //msgatrasada = Promise.resolve("Carregando...");
                    this.msgatrasadaPromise = new Promise(function (resolve, reject) {
                        //resolve("abc");
                        //setTimeout( ()=> { zone.run( () => { this.msgatrasada = "1" }}, 100)
                        setTimeout(function () { this.msgatrasada = "1"; }, 100);
                    });
                    //setTimeout( function() { zone.run( () => { msgatrasada = "1" }}, 100);
                    this.mostrar = true;
                    this.cursos = ['SQL', 'Win'];
                    this.adicionar = function (value) {
                        this.cursos.push(value);
                        this.mostrar = (!this.mostrar);
                    };
                    this.heroes = h1.getHeroes();
                    //var injector = new Injector([HeroServices]);
                    //let h = injector.get(HeroServices);
                    //this.heroes = h.getHeroes(); 
                    //this.debug = injector;
                }
                AppComponent.prototype.ngOnInit = function () {
                    //this.msgatrasada = "3";
                    var that = this;
                    setInterval(function () {
                        that.zone.run(function () {
                            that.msgcount = that.msgcount + 1;
                            that.msgatrasada = that.msgcount;
                        });
                    }, 1000);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n\t<p>debug: {{debug}}</p>\n\t<h1>Cursos</h1>\n\t<input #input><button (click)=\"adicionar(input.value)\">Add</button>\n\t<ul>\n\t  <li *ngFor=\"#curso of cursos\">{{curso}}\n\t</ul>\n\t<template [ngIf]=\"mostrar\">\n\t  <p>Essa mensagem est\u00E1 escondida</p>\n\t</template>\n\t<edit></edit>\n\t<p>{{heroes}}</p>\n\t<p>mensagem atrasada: {{ msgatrasada }}</p>\n\t",
                        directives: [AppHeader, EditableText]
                    }), 
                    __metadata('design:paramtypes', [HeroServices, HeroInternals, core_1.NgZone])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map