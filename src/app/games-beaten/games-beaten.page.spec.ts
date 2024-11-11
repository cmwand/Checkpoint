import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamesBeatenPage } from './games-beaten.page';

describe('GamesBeatenPage', () => {
  let component: GamesBeatenPage;
  let fixture: ComponentFixture<GamesBeatenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesBeatenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
