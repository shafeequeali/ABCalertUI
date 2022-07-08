import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlertsComponent } from './create-alerts.component';

describe('CreateAlertsComponent', () => {
  let component: CreateAlertsComponent;
  let fixture: ComponentFixture<CreateAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
