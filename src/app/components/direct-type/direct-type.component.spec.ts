import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTypeComponent } from './direct-type.component';

describe('DirectTypeComponent', () => {
  let component: DirectTypeComponent;
  let fixture: ComponentFixture<DirectTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
