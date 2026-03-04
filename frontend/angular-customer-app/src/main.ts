import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MatSnackBarModule } from '@angular/material/snack-bar';


ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideZonelessChangeDetection() ,
    importProvidersFrom(MatSnackBarModule)

  ]
});