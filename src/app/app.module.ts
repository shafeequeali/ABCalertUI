import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { CheckboxComponent } from './generalComponents/checkbox/checkbox.component';
import { InputComponent } from './generalComponents/input/input.component';
import { ButtonComponent } from './generalComponents/button/button.component';
import { CsvComponent } from './components/csv/csv.component';
import { DirectTypeComponent } from './components/direct-type/direct-type.component';
import { CreateAlertComponent } from './components/create-alert/create-alert.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { SelectComponent } from './generalComponents/select/select.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RadioButtonComponent } from './generalComponents/radio-button/radio-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ViewAlertsComponent } from './pages/view-alerts/view-alerts.component';
import { CreateAlertsComponent } from './pages/create-alerts/create-alerts.component';
import { ProcessedAlertsComponent } from './pages/processed-alerts/processed-alerts.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LogoComponent } from './subComponents/logo/logo.component';
import { ViewHeaderComponent } from './subComponents/view-header/view-header.component';
import { ViewContentComponent } from './subComponents/view-content/view-content.component';
import { ViewFooterComponent } from './subComponents/view-footer/view-footer.component';
import { InputHmlComponent } from './generalComponents/input-hml/input-hml.component';
import { CardsComponent } from './generalComponents/cards/cards.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './generalComponents/paginator/paginator.component';
import { ProcessedCardComponent } from './subComponents/processed-card/processed-card.component';
import { ProcessedContentComponent } from './subComponents/processed-content/processed-content.component';
import { FromPriviewComponent } from './subComponents/from-priview/from-priview.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { FormFootButtonsComponent } from './subComponents/form-foot-buttons/form-foot-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CheckboxComponent,
    InputComponent,
    ButtonComponent,
    CsvComponent,
    DirectTypeComponent,
    CreateAlertComponent,
    HeaderBarComponent,
    SelectComponent,
    RadioButtonComponent,
    ViewAlertsComponent,
    CreateAlertsComponent,
    ProcessedAlertsComponent,
    SidebarComponent,
    LogoComponent,
    ViewHeaderComponent,
    ViewContentComponent,
    ViewFooterComponent,
    InputHmlComponent,
    CardsComponent,
    PaginatorComponent,
    ProcessedCardComponent,
    ProcessedContentComponent,
    FromPriviewComponent,
    FormPageComponent,
    FormFootButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatRadioModule,
    NgxCsvParserModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      { path: '', component: ViewAlertsComponent },
      { path: 'create_alerts', component: CreateAlertsComponent },
      { path: 'processed_alerts', component: ProcessedAlertsComponent },
      { path: 'form_page', component: FormPageComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
