import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromPriviewComponent } from './from-priview.component';

describe('FromPriviewComponent', () => {
  let component: FromPriviewComponent;
  let fixture: ComponentFixture<FromPriviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromPriviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromPriviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
