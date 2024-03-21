import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMeWhenAfkComponent } from './page-me-when-afk.component';

describe('PageMeWhenAfkComponent', () => {
  let component: PageMeWhenAfkComponent;
  let fixture: ComponentFixture<PageMeWhenAfkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMeWhenAfkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageMeWhenAfkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
