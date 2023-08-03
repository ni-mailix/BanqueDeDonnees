import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseStatComponent } from './analyse-stat.component';

describe('AnalyseStatComponent', () => {
  let component: AnalyseStatComponent;
  let fixture: ComponentFixture<AnalyseStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyseStatComponent]
    });
    fixture = TestBed.createComponent(AnalyseStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
