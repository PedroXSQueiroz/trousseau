import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrousseauPage } from './trousseau.page';

describe('TrousseauPage', () => {
  let component: TrousseauPage;
  let fixture: ComponentFixture<TrousseauPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrousseauPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrousseauPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
