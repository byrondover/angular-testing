import { ComponentFixture, ComponentFixtureAutoDetect,
         TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerComponent } from './banner-inline.component';

describe('BannerComponent (inline template)', () => {

  const _differentTitle: string = 'Test Title';

  let comp: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ], // declare the test component
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });

    fixture = TestBed.createComponent(BannerComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display original title', () => {
    // Hooray! No `fixture.detectChanges()` needed
    expect(el.textContent).toContain(comp.title);
  });

  it('should still see original title after comp.title change', () => {
    const _originalTitle = comp.title;
    comp.title = _differentTitle;
    // Display title is old because Angular didn't hear the change :(
    expect(el.textContent).toContain(_originalTitle);
  });

  it('should display updated title after detectChanges', () => {
    comp.title = _differentTitle;
    fixture.detectChanges();
    expect(el.textContent).toContain(_differentTitle);
  });
});
