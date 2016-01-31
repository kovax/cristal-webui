import {Injectable} from 'angular2/core';

@Injectable()
export class Logger {

  debugOn = true;

  constructor() {}

  debug(msg: any) { console.log(msg); }
  error(msg: any) { console.error(msg); }
  warn(msg: any)  { console.warn(msg); }
}
