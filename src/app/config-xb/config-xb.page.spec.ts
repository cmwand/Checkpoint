import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigXbPage } from './config-xb.page';

describe('ConfigXbPage', () => {
  let component: ConfigXbPage;
  let fixture: ComponentFixture<ConfigXbPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigXbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
