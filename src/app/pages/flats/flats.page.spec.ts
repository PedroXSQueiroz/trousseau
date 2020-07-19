import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlatsPage } from './flats.page';

describe('FlatsPage', () => {
  let component: FlatsPage;
  let fixture: ComponentFixture<FlatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
