import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  providers: [
    AuthService,
    RouterModule,
    AuthGuard,
  ],
})

export class CoreModule {
}
