import {Component, OnInit, OnChanges} from 'angular2/core';
import {Router, ComponentInstruction, OnActivate} from "angular2/router";

import {Logger} from "../../services/logger/logger";


@Component({
  selector: 'login',
  templateUrl: 'app/components/login/login.html',
  styleUrls: ['app/components/login/login.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Login implements OnInit, OnActivate {

  user: string;
  password: string;

  constructor(private router:Router, private logger:Logger) {}

  prevComponent: ComponentInstruction;

  ngOnInit() {
    this.user = localStorage.getItem("crise-user");
  }

  onSubmit() {
    this.logger.debug("Login.onSubmit() - user:"+this.user);

    localStorage.setItem("crise-user", this.user);
    sessionStorage.setItem('crise-token', this.user)

    //TODO: use prevComponent to navigate back to the original view
    this.router.navigate(['DomainRoot']);
  }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) : any {
    this.logger.debug(`Login.routerOnActivate() - Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`);
    this.prevComponent = prev;
  }
}
