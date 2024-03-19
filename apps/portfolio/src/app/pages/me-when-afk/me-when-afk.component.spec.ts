import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeWhenAfkComponent } from './me-when-afk.component';

describe('MeWhenAfkComponent', () => {
  let component: MeWhenAfkComponent;
  let fixture: ComponentFixture<MeWhenAfkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeWhenAfkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MeWhenAfkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
