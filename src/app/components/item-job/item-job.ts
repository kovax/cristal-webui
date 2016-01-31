import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {ItemService} from "../../services/item/item";
import {Logger} from "../../services/logger/logger";

/*
export interface JobItem {
  name: string;
  location: string;
}

export interface JobProperties {
  Breakpoint: string;
  StateMachineVersion: string;
  SchemaVersion: string;
  SchemaType: string;
  Name: string;
  Version: string;
  'Show time': string;
  StateMachineName: string;
}

export interface JobActivity {
  name: string;
  path: string;
  type: string;
  properties: JobProperties;
}

export interface JobTransition {
  name: string;
  origin: string;
  target: string;
  stateMachine: string;
  stateMachineData: string;
}

export interface JobData {
  required: boolean;
  schema: string;
  schemaData: string;
}

export interface Job {
  agent: string;
  role?: any;
  item: JobItem;
  activity: JobActivity;
  transition: JobTransition;
  data: JobData;
}
*/

@Component({
  selector: 'item-job',
  templateUrl: 'app/components/item-job/item-job.html',
  styleUrls: ['app/components/item-job/item-job.css'],
  providers: [ItemService],
  directives: [],
  pipes: []
})
export class ItemJob implements OnInit{

  debugOn: boolean = false;

  uuid: string;
  agent: string;

  jobs: any;

  error: any;

  constructor(private router:      Router,
              private routeParams: RouteParams,
              private item:        ItemService,
              private logger:      Logger) {}

  ngOnInit() {
    this.uuid   = this.routeParams.get('uuid');
    this.agent = this.routeParams.get('agent');

    this.item.getJobs(this.uuid, this.agent).subscribe(
        resp => this.jobs = resp,
        err => this.error = err
    );
  }
}
