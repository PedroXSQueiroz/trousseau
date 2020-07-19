import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrousseauReportPage } from './trousseau-report.page';

describe('TrousseauReportPage', () => {
  let component: TrousseauReportPage;
  let fixture: ComponentFixture<TrousseauReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrousseauReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrousseauReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
