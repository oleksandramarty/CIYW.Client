import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywCheckboxComponent } from './ciyw-checkbox.component';

describe('CiywCheckboxComponent', () => {
  let component: CiywCheckboxComponent;
  let fixture: ComponentFixture<CiywCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
