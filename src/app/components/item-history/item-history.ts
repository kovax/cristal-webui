import {Component, OnInit} from 'angular2/core';
import {Input} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {ItemService} from "../../services/item/item";
import {Logger} from "../../services/logger/logger";
import {ROUTER_DIRECTIVES} from "angular2/router";

export interface Activity {
  name: string;
  path: string;
  type: string;
}

export interface Transition {
  name: string;
  origin: string;
  target: string;
  stateMachine: string;
  stateMachineData: string;
}

export interface Outcome {
  name: string;
  schema: string;
  schemaData: string;
  data: string;
}

export interface Event {
  id: number;
  timestamp: string;
  agent: string;
  role?: any;
  outcome?: Outcome;
  activity: Activity;
  transition: Transition;
}

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
}
