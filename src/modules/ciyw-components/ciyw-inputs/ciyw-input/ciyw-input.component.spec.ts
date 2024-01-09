import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywInputComponent } from './ciyw-input.component';

describe('CiywInputComponent', () => {
  let component: CiywInputComponent;
  let fixture: ComponentFixture<CiywInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
