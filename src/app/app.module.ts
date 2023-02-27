import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ManagementComponent } from './management/management.component';
import { CartGroupsComponent } from './cart-groups/cart-groups.component';
import { SettingsComponent } from './settings/settings.component';
import { CartGroupsNewComponent } from './cart-groups-new/cart-groups-new.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ManagementComponent,
    CartGroupsComponent,
    SettingsComponent,
    CartGroupsNewComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ManagementComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

