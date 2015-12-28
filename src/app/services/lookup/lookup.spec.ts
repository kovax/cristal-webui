import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {LookupService} from './lookup';


describe('Lookup Service', () => {

  beforeEachProviders(() => [LookupService]);


  it('should ...', inject([LookupService], (service:LookupService) => {

  }));

});
