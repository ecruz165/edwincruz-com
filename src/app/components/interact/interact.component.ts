import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {ContactMeDialogComponent} from "./contact-me-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {isPlatformBrowser} from "@angular/common";

export interface MenuItem {
  title: string,
  url: string,
  target: string,
  iconType: string,
  iconGroup?: string,
  iconValue: string
}

@Component({
  selector: 'app-interact',
  templateUrl: './interact.component.html',
  styleUrls: ['./interact.component.scss']
})
export class InteractComponent implements OnInit {

  @ViewChild("selectionList")
  selectionList?:MatSelectionList;

  selectedMenuItem?: MenuItem;

  menu: MenuItem[] = [
    {
      title: 'Buy Me a Coffee',
      url: 'https://www.buymeacoffee.com/edwincruz',
      target: '_interact',
      iconType: 'svg',
      iconValue: 'assets/bmcbrand/svg-files/bmc-logo.svg'
    }, {
      title: 'Schedule Time with Me',
      url: 'https://calendly.com/edwincruz/15min',
      target: '_interact',
      iconType: 'matIcon',
      iconValue: 'event'
    }, {
      title: 'Contact Me',
      url: '#',
      target: '#',
      iconType: 'faIcon',
      iconGroup: 'fas',
      iconValue: 'address-card',
    }
  ];

  constructor(public dialog: MatDialog, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
  }

  getIcon(iconGroup: any, iconValue: any): IconProp {
    return [iconGroup, iconValue];
  }

  onSelect(menuItem: MenuItem): void {
    this.selectedMenuItem = menuItem;
    switch (menuItem.url) {
      case ('#'): {
        this.openDialog();
        break;
      }
      default: {
        if (isPlatformBrowser(this.platformId)) {
          window.open(menuItem.url, menuItem.target);
        }
      }
    }
    this.selectionList?.deselectAll();
  }

  onClick($event: MatSelectionListChange) {

  }

  private openDialog() {
    this.dialog.open(ContactMeDialogComponent, {
        data: {
          email: 'ecruz165@yahoo.com',
          sms: '+19176267137',
          qrCodePath: '/assets/contact-card/contact-card.svg',
          vCardPathForIos: '/assets/contact-card/contact-card-ios.vcf',
          vCardPathForAndroid: '/assets/contact-card/contact-card-google.csv',
          vCardPathForWindows: '/assets/contact-card/contact-card-outlook.csv'
        },
        restoreFocus: true
      }
    );

  }

}
