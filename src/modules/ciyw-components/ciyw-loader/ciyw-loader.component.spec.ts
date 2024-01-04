import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywLoaderComponent } from './ciyw-loader.component';

describe('CiywLoaderComponent', () => {
  let component: CiywLoaderComponent;
  let fixture: ComponentFixture<CiywLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
