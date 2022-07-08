import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedContentComponent } from './processed-content.component';

describe('ProcessedContentComponent', () => {
  let component: ProcessedContentComponent;
  let fixture: ComponentFixture<ProcessedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessedContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
