import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigPsPage } from './config-ps.page';

describe('ConfigPsPage', () => {
  let component: ConfigPsPage;
  let fixture: ComponentFixture<ConfigPsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
