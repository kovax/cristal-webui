import {Directive} from "angular2/core";
import {Router, RouterOutlet, ComponentInstruction} from "angular2/router";
import {Attribute, ElementRef, DynamicComponentLoader} from "angular2/core";
import {Logger} from "../../services/logger/logger";

@Directive({
  selector: 'router-outlet'
})
export class AuthRouterOutlet extends RouterOutlet {

  publicRoutes: any;

  constructor(elementRef: ElementRef, loader: DynamicComponentLoader,
              private router: Router, @Attribute('name') nameAttr: string,
              private logger: Logger)
  {
    super(elementRef, loader, router, nameAttr);

    this.publicRoutes = {
      'login': true,
      'signup': true
    };
  }

  activate(instruction: ComponentInstruction) {
    var url:string = instruction.urlPath;

    if (!this.publicRoutes[url] && !sessionStorage.getItem('crise-token')) {
      this.logger.debug("AuthRouterOutlet.activate() - Private route: "+url);
      this.router.navigate(['Login']);
    }

    this.logger.debug("AuthRouterOutlet.activate() - activating route: "+url);

    return super.activate(instruction);
  }
}