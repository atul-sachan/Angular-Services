/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoggerTestComponent } from './logger-test.component';

describe('LoggerComponent', () => {
  let component: LoggerTestComponent;
  let fixture: ComponentFixture<LoggerTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoggerTestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
