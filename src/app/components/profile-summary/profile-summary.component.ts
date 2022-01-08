import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-profile-summary',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms', style({opacity: 1}))
      ]),
      transition(':leave', [animate('200ms', style({opacity: 0}))]),
    ]),
  ],
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent implements OnInit {

  viewable = false;

  constructor() {
  }

  ngOnInit(): void {
  }


  toggle() {
    this.viewable = !this.viewable;
  }
}
