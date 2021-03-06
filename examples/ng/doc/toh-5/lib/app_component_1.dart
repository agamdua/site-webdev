// #docplaster
// #docregion , v2
import 'package:angular/angular.dart';
// #enddocregion ,
// #docregion v2
import 'package:angular_router/angular_router.dart';
// #docregion

import 'src/hero_service.dart';
import 'src/heroes_component.dart';

// #enddocregion v2
@Component(
    selector: 'my-app',
    template: '''
      <h1>{{title}}</h1>
      <my-heroes></my-heroes>''',
    directives: const [HeroesComponent],
    providers: const [HeroService])
// #enddocregion ,
class Bogus {}

// #docregion v2
@Component(
    selector: 'my-app',
    // #docregion template-v2
    template: '''
      <h1>{{title}}</h1>
      <a [routerLink]="['Heroes']">Heroes</a>
      <router-outlet></router-outlet>''',
    // #enddocregion template-v2
    directives: const [ROUTER_DIRECTIVES],
    providers: const [HeroService, ROUTER_PROVIDERS])
@RouteConfig(const [
  const Route(path: '/heroes', name: 'Heroes', component: HeroesComponent)
])
// #docregion ,
class AppComponent {
  String title = 'Tour of Heroes';
}
