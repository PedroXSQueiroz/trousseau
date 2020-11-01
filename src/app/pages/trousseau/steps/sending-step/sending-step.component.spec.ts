import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendingStepComponent } from './sending-step.component';

describe('SendingStepComponent', () => {
  let component: SendingStepComponent;
  let fixture: ComponentFixture<SendingStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingStepComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendingStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
