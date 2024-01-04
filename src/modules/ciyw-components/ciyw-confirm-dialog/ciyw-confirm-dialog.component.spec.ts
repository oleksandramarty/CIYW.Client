import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywConfirmDialogComponent } from './ciyw-confirm-dialog.component';

describe('CiywConfirmDialogComponent', () => {
  let component: CiywConfirmDialogComponent;
  let fixture: ComponentFixture<CiywConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywConfirmDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
