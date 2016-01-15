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
import {Item} from './item';


describe('Item Service', () => {

  beforeEachProviders(() => [Item]);


  it('should ...', inject([Item], (service:Item) => {

  }));

});
