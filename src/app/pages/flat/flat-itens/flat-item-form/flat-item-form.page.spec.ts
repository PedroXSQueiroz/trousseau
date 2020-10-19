import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlatItemFormPage } from './flat-item-form.page';

describe('FlatItemFormPage', () => {
  let component: FlatItemFormPage;
  let fixture: ComponentFixture<FlatItemFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatItemFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlatItemFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
