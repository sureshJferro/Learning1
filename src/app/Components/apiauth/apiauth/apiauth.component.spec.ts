import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiauthComponent } from './apiauth.component';

describe('ApiauthComponent', () => {
  let component: ApiauthComponent;
  let fixture: ComponentFixture<ApiauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiauthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
