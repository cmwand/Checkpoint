import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigNtPage } from './config-nt.page';

describe('ConfigNtPage', () => {
  let component: ConfigNtPage;
  let fixture: ComponentFixture<ConfigNtPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigNtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
