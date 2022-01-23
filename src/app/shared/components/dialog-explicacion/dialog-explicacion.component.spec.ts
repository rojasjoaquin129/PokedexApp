import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExplicacionComponent } from './dialog-explicacion.component';

describe('DialogExplicacionComponent', () => {
  let component: DialogExplicacionComponent;
  let fixture: ComponentFixture<DialogExplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExplicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
