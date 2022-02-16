import {Component, Input, OnInit} from '@angular/core';
import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-web-resources',
  templateUrl: './web-resources.component.html',
  styleUrls: ['./web-resources.component.scss'],
  animations: [
    trigger('visibilityState', [
      state('hideDetails', style({margin: '0 0 466px 0', minHeight: '78px'})),
      state('showDetails', style({margin: '0 0 0 0', minHeight: '544px'})),
      transition('hideDetails => showDetails', [
        group([
          animate(200, style({margin: '0 0 0 0', minHeight: '544px'})),
          query('@childVisibilityState', animateChild()),
        ])
      ]),

      transition('showDetails => hideDetails', [
        group([
          query('@childVisibilityState', animateChild()),
          animate(200, style({margin: '0 0 466px 0', minHeight: '78px'}))
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
export class WebResourcesComponent implements OnInit {
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

  resources = [
    {
      category: 'On-demand Learning',
      items: [
        {
          title: 'A Cloud Guru',
          url: 'https://acloudguru.com/',
          description: 'Digital Cloud Certification Training'
        },
        {
          title: 'Frontend Masters',
          url: 'https://frontendmasters.com/',
          description: 'Digital Cloud Certification Training'
        },
        {
          title: 'LinkedIn Learning',
          url: 'https://www.linkedin.com/learning',
          description: 'Online Training Courses'
        },
        {
          title: 'Serverless Land',
          url: 'https://serverlessland.com/',
          description: 'Technology Training Platform'
        },
        {
          title: 'Udemy',
          url: 'https://udemy.com/',
          description: 'Online Courses'
        },
      ]
    },
    {
      category: 'Blog/Article Resources',
      items: [
        {
          title: 'InDepth.dev',
          url: 'https://indepth.dev/',
          description: 'Community of passionate web developers'
        }, {
          title: 'Mykong.com',
          url: 'https://mkyong.com/',
          description: 'Spring and Java snippets'
        }, {
          title: 'Refactoring.guru',
          url: 'https://refactoring.guru/',
          description: 'Interactive Refactoring Course'
        }, {
          title: 'Serverlessland.com',
          url: 'https://serverlessland.com/',
          description: 'AWS Serverless Portal'
        },
      ]
    },
    {
      category: 'Cloud Apps',
      items: [
        {
          title: 'Airtable',
          url: 'https://www.airtable.com/',
          description: 'Cloud Datasource/Spreadsheet'
        }, {
          title: 'Balsamiq Wireframes',
          url: 'https://balsamiq.com/',
          description: 'UI/UX design tool'
        }, {
          title: 'Bitly',
          url: 'https://bitly.us/',
          description: 'Link Shortening/Management'
        }, {
          title: 'Calendly ',
          url: 'https://calendly.com/',
          description: 'Scheduling meetings'
        }, {
          title: 'Cloud Craft',
          url: 'https://app.cloudcraft.co/',
          description: 'Cloud Diagramming'
        }, {
          title: 'Dropbox ',
          url: 'https://app.cloudcraft.co/',
          description: 'Cloud Storage'
        }, {
          title: 'GitHub',
          url: 'https://github.com/',
          description: 'Source Control'
        }, {
          title: 'JackDB Client',
          url: 'https://www.jackdb.com/',
          description: 'Database Web Client'
        }, {
          title: 'Jira',
          url: 'https://www.atlassian.com/software/jira',
          description: 'Agile Sprint Management'
        }, {
          title: 'Jotform',
          url: 'https://www.jotform.com/',
          description: 'Form Builder'
        }, {
          title: 'Lucid Charts',
          url: 'https://lucid.co/',
          description: 'Diagramming'
        }, {
          title: 'QR Code Generator',
          url: 'https://www.qr-code-generator.com/',
          description: 'QR Code Generator'
        }, {
          title: 'Mailchimp',
          url: 'https://mailchimp.com/',
          description: 'Email Marketing'
        }, {
          title: 'Zoom',
          url: 'https://zoom.us/',
          description: 'Video Conferencing'
        },
      ]
    }
  ]
}
