import {NgModule} from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostFormComponent } from './post-form/post-form.component';
import { PostCardComponent } from './post-card/post-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  imports: [
    RouterModule.forChild([]),
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NavbarComponent,
    PostFormComponent,
    PostCardComponent,
    UserInfoComponent,
  ],
  exports: [
    NavbarComponent,
    PostFormComponent,
    PostCardComponent,
    UserInfoComponent,
  ]
})

export class SharedModule {
}
