import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaComponent } from './qna.component';

describe('QnaComponent', () => {
  let component: QnaComponent;
  let fixture: ComponentFixture<QnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QnaComponent]
    });
    fixture = TestBed.createComponent(QnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
