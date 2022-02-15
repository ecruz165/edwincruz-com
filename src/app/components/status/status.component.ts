import {Component, Input, OnInit} from '@angular/core';
import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";

//https://stackblitz.com/edit/angular-vnvuxq?file=src%2Fapp%2Fapp.component.ts
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  animations: [
    trigger('visibilityState', [
      state('hideDetails', style({margin: '0 0 116px 0', minHeight: '52px'})),
      state('showDetails', style({margin: '0 0 0 0', minHeight: '168px'})),
      transition('hideDetails => showDetails', [
        group([
          animate(100, style({margin: '0 0 0 0', minHeight: '168px'})),
          query('@childVisibilityState', animateChild()),
        ])
      ]),

      transition('showDetails => hideDetails', [
        group([
          query('@childVisibilityState', animateChild()),
          animate(100, style({margin: '0 0 116px 0', minHeight: '52px'}))
        ])
      ])

    ]),

    trigger('childVisibilityState', [
      state('hideDetails', style({opacity: '0', display: 'none'})),
      state('showDetails', style({opacity: '1', display: 'block'})),
      transition('* <=> *', [
        animate(200),
      ]),
    ]),

  ]
})
export class StatusComponent implements OnInit {
  @Input()
  visibilityState = 'hideDetails';
  viewable = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.viewable = !this.viewable;
    this.visibilityState = this.viewable ? 'showDetails' : 'hideDetails';
    console.log(this.viewable);
  }
}
