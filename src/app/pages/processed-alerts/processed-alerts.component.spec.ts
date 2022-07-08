import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedAlertsComponent } from './processed-alerts.component';

describe('ProcessedAlertsComponent', () => {
  let component: ProcessedAlertsComponent;
  let fixture: ComponentFixture<ProcessedAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessedAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessedAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
