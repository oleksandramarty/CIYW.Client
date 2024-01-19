import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywFileUploadComponent } from './ciyw-file-upload.component';

describe('CiywFileUploadComponent', () => {
  let component: CiywFileUploadComponent;
  let fixture: ComponentFixture<CiywFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywFileUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
