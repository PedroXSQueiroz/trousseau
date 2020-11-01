import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InitStepComponent } from './init-step.component';

describe('InitStepComponent', () => {
  let component: InitStepComponent;
  let fixture: ComponentFixture<InitStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitStepComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InitStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
