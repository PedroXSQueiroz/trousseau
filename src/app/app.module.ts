import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatStepperModule} from "@angular/material/stepper";
import { ServerInterceptorService } from './services/server-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: 
    [ BrowserModule, 
      IonicModule.forRoot(), 
      AppRoutingModule, 
      MatStepperModule,
      FormsModule,
      IonicStorageModule.forRoot(),
      HttpClientModule,
      BrowserAnimationsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ServerInterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
