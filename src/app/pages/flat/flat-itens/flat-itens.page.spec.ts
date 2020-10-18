import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlatItensPage } from './flat-itens.page';

describe('FlatItensPage', () => {
  let component: FlatItensPage;
  let fixture: ComponentFixture<FlatItensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatItensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlatItensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
