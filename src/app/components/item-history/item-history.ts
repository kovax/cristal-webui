import {Component, OnInit} from 'angular2/core';
import {Input} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {ItemService} from "../../services/item/item";
import {Logger} from "../../services/logger/logger";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Event, Outcome, Activity, Transition} from "../item-event/item-event";

@Component({
  selector: 'item-history',
  templateUrl: 'app/components/item-history/item-history.html',
  styleUrls: ['app/components/item-history/item-history.css'],
  providers: [ItemService],
  directives: [],
  pipes: []
})
export class ItemHistory implements OnInit {

  uuid: string;

  history: Array<Event>;

  error: any;

  constructor(private router:      Router,
              private routeParams: RouteParams,
              private item:        ItemService,
              private logger:      Logger) {}

  ngOnInit() {
    this.uuid   = this.routeParams.get('uuid');

    this.item.getHistory(this.uuid).subscribe(
        resp => this.history = resp,
        err => this.error = err
    );
  }

  onRowClick(event:Event) {
    this.logger.debug("ItemHistory.onRowClick() - event id:"+event.id);

    this.router.navigate(['ItemEvent', {uuid: this.uuid, id:event.id}]);
  }
}
