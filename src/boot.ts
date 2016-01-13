import {bootstrap} from 'angular2/platform/browser'
import {AppComponent,TimerComponent} from './app'

import {DataServices} from './services';

bootstrap(AppComponent, [DataServices]);

bootstrap(TimerComponent);