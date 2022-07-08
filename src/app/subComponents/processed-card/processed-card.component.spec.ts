import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedCardComponent } from './processed-card.component';

describe('ProcessedCardComponent', () => {
  let component: ProcessedCardComponent;
  let fixture: ComponentFixture<ProcessedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessedCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
