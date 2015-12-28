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
import {ItemService} from './item';


describe('Item Service', () => {

  beforeEachProviders(() => [ItemService]);
  it('should ...', inject([ItemService], (service:ItemService) => {

  }));

});
