import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "./registerlogin/guards/auth.guard"
import { StronaGlownaComponent }      from './strona-glowna/strona-glowna.component';
import { ProcesorComponent }      from './procesor/procesor.component';
import { KartaGraficznaComponent }      from './karta-graficzna/karta-graficzna.component';
import { DyskTwardyComponent }      from './dysk-twardy/dysk-twardy.component';
import { PamiecComponent }      from './pamiec/pamiec.component';
import { PlytaGlownaComponent }      from './plyta-glowna/plyta-glowna.component';
import { ObudowaComponent }      from './obudowa/obudowa.component';
import { ZasilaczComponent }      from './zasilacz/zasilacz.component';
import { DodatkiComponent }      from './dodatki/dodatki.component';
import { KoszykComponent }      from './koszyk/koszyk.component';
import { FormComponent }      from './registerlogin/form/form.component';
import { Form2Component }      from './registerlogin/form2/form2.component';
import { RouterModule, Routes } from '@angular/router';
import {UstawieniaComponent} from './ustawienia/ustawienia.component';
import {ZamowieniaComponent} from './zamowienia/zamowienia.component';
import { LoginGuard } from './registerlogin/guards/login.guard';
import { ZlozZamowienieComponent} from './zloz-zamowienie/zloz-zamowienie.component';
import {ZalogujSieComponent} from "./zaloguj-sie/zaloguj-sie.component";
import {PojedynczyProduktComponent} from './pojedynczy-produkt/pojedynczy-produkt.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  { path: '404', redirectTo: '', pathMatch: 'full' },
  { path: '', pathMatch: 'full', component: StronaGlownaComponent},
  { path: 'procesory', component: ProcesorComponent},
  {path: 'karty-graficzne', component: KartaGraficznaComponent },
  {path: 'pamiec', component: PamiecComponent },
  {path: 'dyski-twarde', component: DyskTwardyComponent },
  {path: 'plyty-glowne', component: PlytaGlownaComponent },
  {path: 'obudowy', component: ObudowaComponent },
  {path: 'zasilacze', component: ZasilaczComponent },
  {path: 'dodatki', component: DodatkiComponent },
  {path: 'koszyk', component: KoszykComponent },
  {path: 'rejestracja', component: FormComponent },
  {path: 'logowanie', component: Form2Component},
  {path: 'zamowienia', component: ZamowieniaComponent, canActivate: [AuthGuard] },
  {path: 'ustawienia', component: UstawieniaComponent, canActivate: [AuthGuard] },
  {path: 'zloz-zamowienie', component: ZlozZamowienieComponent, canActivate: [LoginGuard] },
  {path: 'zaloguj-sie', component:ZalogujSieComponent },
  {path: 'k/:grupa/:id', component: PojedynczyProduktComponent },
  {path: 'search/:value', component: SearchComponent,runGuardsAndResolvers: 'always' },
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
      useHash: true
    })
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
