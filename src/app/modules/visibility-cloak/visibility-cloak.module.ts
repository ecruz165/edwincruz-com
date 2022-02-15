import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisibilityCloakDirective} from './visibility-cloak.directive';


@NgModule({
  imports: [CommonModule],
  declarations: [VisibilityCloakDirective],
  exports: [VisibilityCloakDirective]
})
export class VisibilityCloakModule {
}
