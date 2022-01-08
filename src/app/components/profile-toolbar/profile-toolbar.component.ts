import {Component, OnInit} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {AppThemeService} from "../../app-theme.service";

export interface MenuItem {
  label: string;
  href: string;
  target: string;
  iconProp: IconProp;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
}

@Component({
  selector: 'app-profile-toolbar',
  templateUrl: './profile-toolbar.component.html',
  styleUrls: ['./profile-toolbar.component.scss']
})
export class ProfileToolbarComponent implements OnInit {
  isDarkMode;

  menuItems: MenuItem[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/edwinmcruz/',
      target: '_external',
      iconProp: ['fab', 'linkedin'],
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    }, {
      label: 'Github',
      href: 'https://github.com/ecruz165',
      target: '_external',
      iconProp: ['fab', 'github'],
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    }, {
      label: 'Hackerrank',
      href: 'https://www.hackerrank.com/ecruz165',
      target: '_external',
      iconProp: ['fab', 'hackerrank'],
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    }, {
      label: 'Stackoverflow',
      href: 'https://stackoverflow.com/users/6226761/edwin-m-cruz',
      target: '_external',
      iconProp: ['fab', 'stack-overflow'],
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    }, {
      label: 'Stackblitz',
      href: 'https://stackblitz.com/@ecruz165',
      target: '_external',
      iconProp: ['fas', 'bolt'],
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    }, {
      label: 'Twitter',
      href: 'https://twitter.com/ecruz165',
      target: '_external',
      iconProp: ['fab', 'twitter'],
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    }
  ]

  constructor(private themeService: AppThemeService) {
    const mode = this.themeService.getCurrentMode()
    this.isDarkMode = mode?.is_dark;
  }

  ngOnInit(): void {
  }

  toggleThemeMode() {
    this.themeService.toggleThemeMode()
  }

}
