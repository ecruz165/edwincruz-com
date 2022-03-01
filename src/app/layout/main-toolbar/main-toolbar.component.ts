import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {
  selectedMenuItem?: string = 'home';

  constructor(
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const location: Location = this.location;
    let selected: string = '';
    if (isPlatformBrowser(this.platformId)) {
      if (location.path().includes('blog')) {
        selected = 'blog';
      } else if (location.path().includes('resume')) {
        selected = 'resume';
      } else {
        selected = 'home';
      }
      this.selectedMenuItem = selected;
    }
  }

  onClick(menuItem: string) {
    this.selectedMenuItem = menuItem;
    this.router.navigateByUrl(`/${this.selectedMenuItem}`);
  }

}
