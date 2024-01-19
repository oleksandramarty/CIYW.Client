import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiywAvatarComponent } from './ciyw-avatar.component';

describe('CiywAvatarComponent', () => {
  let component: CiywAvatarComponent;
  let fixture: ComponentFixture<CiywAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiywAvatarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiywAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
