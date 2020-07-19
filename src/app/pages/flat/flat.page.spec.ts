import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlatPage } from './flat.page';

describe('FlatPage', () => {
  let component: FlatPage;
  let fixture: ComponentFixture<FlatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
