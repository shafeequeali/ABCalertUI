import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHmlComponent } from './input-hml.component';

describe('InputHmlComponent', () => {
  let component: InputHmlComponent;
  let fixture: ComponentFixture<InputHmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputHmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputHmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
