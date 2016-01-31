import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {ItemService} from "../../services/item/item";
import {Logger} from "../../services/logger/logger";

@Component({
  selector: 'item-job',
  templateUrl: 'app/components/item-job/item-job.html',
  styleUrls: ['app/components/item-job/item-job.css'],
  providers: [ItemService],
  directives: [],
  pipes: []
})

export class ItemJob implements OnInit{

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
