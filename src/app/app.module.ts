import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
//component
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
//ng-zorro
import { en_US,NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MedidorComponent } from './pages/medidor/medidor.component';
import { JerarquiaComponent } from './pages/jerarquia/jerarquia.component';
import { NzTableModule, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { EntradaComponent } from './pages/entrada/entrada.component';
import { TransformadoresComponent } from './pages/transformadores/transformadores.component';
import { ConsumidoresComponent } from './pages/consumidores/consumidores.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
//import { NzI18nService } from 'ng-zorro-antd/i18n';
//import { enUS, ja } from 'date-fns/locale';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    MedidorComponent,
    JerarquiaComponent,
    EntradaComponent,
    TransformadoresComponent,
    ConsumidoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    //ng-zorro
    NzMenuModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzGridModule,
    NzTableModule ,
    NzDropDownModule,
    NzModalModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzRadioModule,
    NzInputNumberModule,
    NzDatePickerModule 
  ],
  providers: [
    { provide: NZ_I18N, 
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          default:
              return en_US;
          }
      },
      deps: [LOCALE_ID]
    }
 //   { provide: NZ_I18N, useValue: enUS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 // constructor(private i18n: NzI18nService) { }
 }
