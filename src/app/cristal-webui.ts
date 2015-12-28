import {Component} from 'angular2/core';
import {LookupService} from "./services/lookup/lookup";
import {LookupData} from "./services/lookup/lookup";
import {Directory} from "./components/directory/directory";

@Component({
    selector: 'cristal-webui-app',
    providers: [LookupService],
    templateUrl: 'app/cristal-webui.html',
    directives: [Directory],
    pipes: []
})

export class CristalWebuiApp {}
