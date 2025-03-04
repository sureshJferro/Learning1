import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AIParentComponent } from './aiparent.component';

describe('AIParentComponent', () => {
  let component: AIParentComponent;
  let fixture: ComponentFixture<AIParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AIParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AIParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
