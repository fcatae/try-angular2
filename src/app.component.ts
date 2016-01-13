import {Component, Injectable, NgZone, OnInit} from 'angular2/core';

export class HeroInternals {

  getHeroes() {
    return ['SA','SuperB','SuperC'];
  }  

}

@Injectable()
export class HeroServices {

  constructor(private h: HeroInternals) {
  }
  
  getHeroes() {
    return this.h.getHeroes();
  }  
}

export class HeroServices2 {

  //h = new HeroInternals();
  
  constructor() {
  }
  
  getHeroes() {
    return ['b'];
    //return this.h.getHeroes();
  }  
}

@Component({
  selector: 'header',
  template: '<h1>Header</h1>'
})
export class AppHeader {
}

@Component({
  selector: 'edit',
  template: `
    <span *ngIf="mode" (click)="change(value)">{{value}}</span>
    <input *ngIf="!mode" [(value)]="value" #input
        (keyup.enter)="change(input.value)" (blur)="change(input.value)">
  `
})
export class EditableText {
  mode = true;
  value = 'text to be edited (1)';
  change = function(newval) {
    this.value = newval;
    this.mode = (!this.mode);
  }
}

@Component({
	selector: 'my-app',
	template: `
	<p>debug: {{debug}}</p>
	<h1>Cursos</h1>
	<input #input><button (click)="adicionar(input.value)">Add</button>
	<ul>
	  <li *ngFor="#curso of cursos">{{curso}}
	</ul>
	<template [ngIf]="mostrar">
	  <p>Essa mensagem está escondida</p>
	</template>
	<edit></edit>
	<p>{{heroes}}</p>
	<p>mensagem atrasada: {{ msgatrasada }}</p>
	`,
	directives: [AppHeader, EditableText]
})

export class AppComponent implements OnInit { 

  msgcount : number = 0;
  msgatrasada : string = "...carregando...";

  constructor(heroServices: HeroServices, h1: HeroInternals, private zone: NgZone) {
    this.heroes = heroServices.getHeroes(); 

    //var injector = new Injector([HeroServices]);
    //let h = injector.get(HeroServices);
    //this.heroes = h.getHeroes(); 
    //this.debug = injector;
    
    

  }
  
  //msgatrasada = Promise.resolve("Carregando...");
  msgatrasadaPromise = new Promise(function(resolve,reject) {
    //resolve("abc");
    //setTimeout( ()=> { zone.run( () => { this.msgatrasada = "1" }}, 100)
    setTimeout( function() { this.msgatrasada = "1" }, 100)
  })
  
  ngOnInit() {
    //this.msgatrasada = "3";
    
    var that = this;
    setInterval(  function() { 
      
      that.zone.run( () => {
      
        that.msgcount = that.msgcount + 1;
        that.msgatrasada = that.msgcount;
      
      });
      
    }, 1000)
  }
  
  //setTimeout( function() { zone.run( () => { msgatrasada = "1" }}, 100);
  
  mostrar = true;
  
  cursos = ['SQL', 'Win'];
  
  adicionar = function(value)  {
    this.cursos.push(value);
    this.mostrar = (!this.mostrar);
  }
}

