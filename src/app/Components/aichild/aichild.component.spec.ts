import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AIChildComponent } from './aichild.component';

describe('AIChildComponent', () => {
  let component: AIChildComponent;
  let fixture: ComponentFixture<AIChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AIChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AIChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
