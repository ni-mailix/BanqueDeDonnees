import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDonneesComponent } from './afficher-donnees.component';

describe('AfficherDonneesComponent', () => {
  let component: AfficherDonneesComponent;
  let fixture: ComponentFixture<AfficherDonneesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherDonneesComponent]
    });
    fixture = TestBed.createComponent(AfficherDonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
