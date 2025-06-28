import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayShortUrlsComponent } from './display-short-urls.component';

describe('DisplayShortUrlsComponent', () => {
  let component: DisplayShortUrlsComponent;
  let fixture: ComponentFixture<DisplayShortUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayShortUrlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayShortUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
