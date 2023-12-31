import { SurveyCreatorModule } from 'survey-creator-angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesComponent } from './modules/features/features.component';
import { SurveyModule } from 'survey-angular-ui';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { TranslocoRootModule } from './transloco-root.module';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { DatePipe } from "@angular/common";






@NgModule({
  declarations: [AppComponent, FeaturesComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatStepperModule,
    SurveyModule,
    SurveyCreatorModule,
    AngularToastifyModule,
    TranslocoRootModule,
    FormsModule,
   
  ],
  providers: [SurveyCreatorModule, SurveyModule, ToastService,DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true  },
     {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
