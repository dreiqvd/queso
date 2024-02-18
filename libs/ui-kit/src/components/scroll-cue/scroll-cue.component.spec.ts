import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollCueComponent } from './scroll-cue.component';

describe('ScrollCueComponent', () => {
  let component: ScrollCueComponent;
  let fixture: ComponentFixture<ScrollCueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollCueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollCueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
