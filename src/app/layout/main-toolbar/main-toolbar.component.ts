import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, Location} from "@angular/common";

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {
  selectedMenuItem?: string = 'home';

  constructor(private location: Location, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      if (location.path().includes('blog')) {
        this.selectedMenuItem = 'blog';
      } else if (location.path().includes('resume')) {
        this.selectedMenuItem = 'resume';
      } else {
        this.selectedMenuItem = 'home';
      }
    }
  }

  ngOnInit(): void {
  }

  onClick(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }

}
