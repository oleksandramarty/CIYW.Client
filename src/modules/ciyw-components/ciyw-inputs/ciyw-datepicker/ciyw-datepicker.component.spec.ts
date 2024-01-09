import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywDatepickerComponent } from './ciyw-datepicker.component';

describe('CiywDatepickerComponent', () => {
  let component: CiywDatepickerComponent;
  let fixture: ComponentFixture<CiywDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywDatepickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
