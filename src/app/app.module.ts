import { DatosService } from './services/servicioDatos/datos.service';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { CopiaService } from './services/serviceCopiaBD/copia.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,CopiaService,DatosService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SqliteDbCopy,SQLite
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
