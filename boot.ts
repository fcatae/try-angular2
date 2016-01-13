import {bootstrap} from 'angular2/platform/browser'
import {AppComponent, HeroServices, HeroServices2, HeroInternals} from './app.component.ts'

let config = {
  apiEndpoint: 'api.heroes.com',
  title: 'The Hero Employment Agency'
};


bootstrap(AppComponent, [HeroServices, HeroServices2, HeroInternals
  ]);
