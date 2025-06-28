import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShortUrlModalComponent } from './add-short-url-modal.component';

describe('AddShortUrlModalComponent', () => {
  let component: AddShortUrlModalComponent;
  let fixture: ComponentFixture<AddShortUrlModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShortUrlModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShortUrlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
