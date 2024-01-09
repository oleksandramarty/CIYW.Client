import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywRadioComponent } from './ciyw-radio.component';

describe('CiywRadioComponent', () => {
  let component: CiywRadioComponent;
  let fixture: ComponentFixture<CiywRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
