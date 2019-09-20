import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Input , Output } from '@angular/core';

import { AppComponent } from './app.component';
import { StronaGlownaComponent } from './strona-glowna/strona-glowna.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProcesorComponent } from './procesor/procesor.component';
import { KartaGraficznaComponent } from './karta-graficzna/karta-graficzna.component';
import { PamiecComponent } from './pamiec/pamiec.component';
import { DyskTwardyComponent } from './dysk-twardy/dysk-twardy.component';
import { PlytaGlownaComponent } from './plyta-glowna/plyta-glowna.component';
import { ObudowaComponent } from './obudowa/obudowa.component';
import { ZasilaczComponent } from './zasilacz/zasilacz.component';
import { DodatkiComponent } from './dodatki/dodatki.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { FormComponent } from './registerlogin/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Form2Component } from './registerlogin/form2/form2.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './helpers/interceptorhttp';
import { FakeBackend } from './helpers/fakebackend';
import{AuthGuard} from "./registerlogin/guards/auth.guard";
import{Redirection} from "./registerlogin/guards/redirection.guard";
import{LoginGuard} from "./registerlogin/guards/login.guard"
import { ZamowieniaComponent } from './zamowienia/zamowienia.component';
import { UstawieniaComponent } from './ustawienia/ustawienia.component';
import { ZlozZamowienieComponent } from './zloz-zamowienie/zloz-zamowienie.component';
import { ZalogujSieComponent } from './zaloguj-sie/zaloguj-sie.component';
import { PojedynczyProduktComponent } from './pojedynczy-produkt/pojedynczy-produkt.component';
import { GetThumbnailPipe } from './get-thumbnail.pipe';
import { GetTotalPipe } from './get-total.pipe';
import { GetTotalPlusDeliveryPipe } from './get-total-plus-delivery.pipe';
import { ReversePipe } from './reverse.pipe';
import { SearchComponent } from './search/search.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 5000,
  }
};
@NgModule({
  declarations: [
    AppComponent,
    StronaGlownaComponent,
    ProcesorComponent,
    KartaGraficznaComponent,
    PamiecComponent,
    DyskTwardyComponent,
    PlytaGlownaComponent,
    ObudowaComponent,
    ZasilaczComponent,
    DodatkiComponent,
    KoszykComponent,
    FormComponent,
    Form2Component,
    ZamowieniaComponent,
    UstawieniaComponent,
    ZlozZamowienieComponent,
    ZalogujSieComponent,
    PojedynczyProduktComponent,
    GetThumbnailPipe,
    GetTotalPipe,
    GetTotalPlusDeliveryPipe,
    ReversePipe,
    SearchComponent,


  ],
  imports: [
    BrowserModule,
    SwiperModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    

  ],
  providers: [
    AuthGuard,
   // Redirection,
   LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackend, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
     
    {
    provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
