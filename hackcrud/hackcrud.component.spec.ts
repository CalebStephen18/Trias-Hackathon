import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackcrudComponent } from './hackcrud.component';

describe('HackcrudComponent', () => {
  let component: HackcrudComponent;
  let fixture: ComponentFixture<HackcrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HackcrudComponent]
    });
    fixture = TestBed.createComponent(HackcrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
