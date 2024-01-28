import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywFormGroupComponent } from './ciyw-form-group.component';

describe('CiywFormGroupComponent', () => {
  let component: CiywFormGroupComponent;
  let fixture: ComponentFixture<CiywFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywFormGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
