import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywPaginatorComponent } from './ciyw-paginator.component';

describe('CiywPaginatorComponent', () => {
  let component: CiywPaginatorComponent;
  let fixture: ComponentFixture<CiywPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywPaginatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
