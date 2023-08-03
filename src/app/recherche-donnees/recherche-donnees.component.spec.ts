import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDonneesComponent } from './recherche-donnees.component';

describe('RechercheDonneesComponent', () => {
  let component: RechercheDonneesComponent;
  let fixture: ComponentFixture<RechercheDonneesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechercheDonneesComponent]
    });
    fixture = TestBed.createComponent(RechercheDonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
