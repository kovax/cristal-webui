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
  selector: 'item-event',
  templateUrl: 'app/components/item-event/item-event.html',
  styleUrls: ['app/components/item-event/item-event.css'],
  providers: [ItemService],
  directives: [],
  pipes: []
})
export class ItemEvent implements OnInit {

  uuid: string;
  event: Event;
  outcomeString: string;

  error: any;

  constructor(private router:      Router,
              private routeParams: RouteParams,
              private item:        ItemService,
              private logger:      Logger) {}

  ngOnInit() {
    this.uuid     = this.routeParams.get('uuid');
    let id:number = Number(this.routeParams.get('id'));

    this.item.getEvent(this.uuid, id).subscribe(
        resp => this.event = resp,
        err => this.error = err,
        () => {
          if(this.event['outcome'] != undefined) {
            this.item.getEventData(this.uuid, id).subscribe(
                resp => this.outcomeString = resp.text(),
                err => this.error = err
            );
          }
        }
    );

  }
}
