import {Component, OnInit} from '@angular/core';
import {AppThemeService} from "../../app-theme.service";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  src: string ='assets/pic-profile-dark.jpg';

  constructor(private themeService: AppThemeService) {
    themeService.getCurrentMode()
    themeService.theme$.subscribe(
      next => {this.src = `assets/pic-profile-${next.is_dark?'dark':'light'}.jpg`}
    )
  }

  ngOnInit(): void {
  }

}
