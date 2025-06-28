import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayShortUrlInfoComponent } from './display-short-url-info.component';

describe('DisplayShortUrlInfoComponent', () => {
  let component: DisplayShortUrlInfoComponent;
  let fixture: ComponentFixture<DisplayShortUrlInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayShortUrlInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayShortUrlInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
