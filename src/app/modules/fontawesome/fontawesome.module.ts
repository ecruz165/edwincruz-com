import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  faBlog,
  faBolt,
  faDownload,
  faEye,
  faFile,
  faPhone,
  faHome,
  faAddressCard
} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faHackerrank, faLinkedin, faStackOverflow, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";


// @ts-ignore
const fontawesomeComponents:IconDefinition[] = [faPhone, faBolt, faTwitter, faHackerrank, faStackOverflow, faGithub, faDownload, faEye, faLinkedin, faFile, faBlog, faHome, faAddressCard];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class FontawesomeSetModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(...fontawesomeComponents);
  }
}
