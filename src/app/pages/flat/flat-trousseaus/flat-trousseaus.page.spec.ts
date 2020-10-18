import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlatTrousseausPage } from './flat-trousseaus.page';

describe('FlatTrousseausPage', () => {
  let component: FlatTrousseausPage;
  let fixture: ComponentFixture<FlatTrousseausPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatTrousseausPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlatTrousseausPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
