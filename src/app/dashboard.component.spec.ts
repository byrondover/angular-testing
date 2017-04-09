import { async, fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { click } from '../../testing';

import { DashboardComponent } from './dashboard.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';

class FakeHeroService {
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve([new Hero(42, 'Test Name')])
  }
}

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('DashboardComponent', () => {

  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroEl: DebugElement;
  let el: HTMLElement;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: HeroService, useClass: FakeHeroService },
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      comp = fixture.componentInstance
      heroEl = fixture.debugElement.query(By.css('.hero'));

      // simulate user selecting a hero
      comp.selectedHero = new Hero(42, 'Test Name');
      fixture.detectChanges();
    });
  }));

  function heroClick(): void {
    click(heroEl);
  }

  it('should tell ROUTER to navigate when hero clicked',
    inject([Router], (router: Router) => { // ...
      const spy = spyOn(router, 'navigateByUrl');

      heroClick(); // trigger click on first inner <div class="hero">

      // args passed to router.navigateByUrl()
      const navArgs = spy.calls.first().args[0];

      // expecting to navigate to id of the component's first hero
      const id = comp.heroes[0].id;
      expect(navArgs).toBe('/heroes/' + id,
        'should nav to HeroDetail for first hero');
  }));

});
