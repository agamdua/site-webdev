// #docregion
import 'dart:async';

import 'package:angular/angular.dart';
import 'package:angular_forms/angular_forms.dart';
import 'package:angular_router/angular_router.dart';

import 'crisis.dart';
import 'crisis_service.dart';

@Component(
  selector: 'crisis-detail',
  templateUrl: 'crisis_detail_component_0.html',
  directives: const [
    CORE_DIRECTIVES, formDirectives,
    ROUTER_DIRECTIVES, // needed for the 'Find help!' link
  ],
  styleUrls: const ['crisis_detail_component.css'],
)
class CrisisDetailComponent implements OnInit {
  Crisis crisis;
  final CrisisService _crisisService;
  final Router _router;
  final RouteParams _routeParams;

  CrisisDetailComponent(this._crisisService, this._router, this._routeParams);

  // #docregion ngOnInit
  Future<Null> ngOnInit() async {
    var _id = _routeParams.get('id');
    var id = int.parse(_id ?? '', onError: (_) => null);
    if (id != null) crisis = await (_crisisService.getCrisis(id));
  }
  // #enddocregion ngOnInit

  // #docregion goBack
  Future goBack() => _router.navigate([
        'Crises',
        crisis == null ? {} : {'id': crisis.id.toString()}
      ]);
  // #enddocregion goBack
}
