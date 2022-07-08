import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFootButtonsComponent } from './form-foot-buttons.component';

describe('FormFootButtonsComponent', () => {
  let component: FormFootButtonsComponent;
  let fixture: ComponentFixture<FormFootButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFootButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFootButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
