import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicapiComponent } from './publicapi.component';

describe('PublicapiComponent', () => {
  let component: PublicapiComponent;
  let fixture: ComponentFixture<PublicapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicapiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
