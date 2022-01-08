import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBolt, faDownload, faEye, faPhone} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faHackerrank, faLinkedin, faStackOverflow, faTwitter} from '@fortawesome/free-brands-svg-icons';

const fontawesomeComponents = [
  faPhone, faBolt, faTwitter, faHackerrank, faStackOverflow, faGithub, faDownload, faEye, faLinkedin
]

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
