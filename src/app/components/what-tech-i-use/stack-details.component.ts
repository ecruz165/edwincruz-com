import {Component, Input, OnInit} from '@angular/core';
import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-stack-details',
  templateUrl: './stack-details.component.html',
  styleUrls: ['./stack-details.component.scss'],
  animations: [
    trigger('visibilityState', [
      state('hideDetails', style({minHeight: '78px'})),
      // margin: '0 0 466px 0',
      state('showDetails', style({minHeight: '544px'})),
      //margin: '0 0 0 0',
      transition('hideDetails => showDetails', [
        group([
          animate(200, style({minHeight: '544px'})),
          //margin: '0 0 0 0',
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
export class StackDetailsComponent implements OnInit {
  @Input()
  visibilityState = 'hideDetails';
  viewable = false;

  toggle() {
    this.viewable = !this.viewable;
    this.visibilityState = this.viewable ? 'showDetails' : 'hideDetails';
  }

  toolset = [
    {
      category: 'Languages',
      items: [
        {
          name: 'Java',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Typescript',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Javascript',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Groovy',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Bash',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Go',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }
      ]
    },
    {
      category: "Frontend",
      items: [
        {
          name: 'Angular',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Angular Material Components',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Ag-Grid',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Ag-Charts',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'HTML',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'SCSS',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'CSS',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Tailwind CSS',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Bootstrap',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }
      ]
    },
    {
      category: 'Middleware/Backend',
      items: [
        {
          name: 'Spring Boot',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Spring Integration',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Hibernate',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }
      ]
    },
    {
      category: 'Data Sources',
      items: [
        {
          name: 'MySQL',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Sybase',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'PostgresSQL',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }
      ]
    },
    {
      category: 'Build & Deployment',
      items: [
        {
          name: 'Gradle',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Docker',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Flyway',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'AWS CodePipe',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'AWS Build',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'AWS Deploy',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'AWS Cloudformation',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'AWS CDK',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }
      ]
    },
    {
      category: 'Cloud Infrastructure',
      items: [
        {
          name: 'AWS Route 53',
          skillLevel: '',
          since: 'ECS',
          lastUsed: 'ECR',
          lastUsedDescription: ''
        }, {
          name: 'AWS Beanstalk',
          skillLevel: 'Beanstalk',
          since: 'ECS',
          lastUsed: 'ECR',
          lastUsedDescription: ''
        }, {
          name: 'AWS Route 53',
          skillLevel: 'Beanstalk',
          since: 'ECS',
          lastUsed: 'ECR',
          lastUsedDescription: ''
        }, {
          name: 'AWS Cloudfront',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'AWS WAF',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'AWS Application Load Balancer',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
      ]
    },
    {
      category: 'IDEs & Desktop Tools',
      items: [
        {
          name: 'IntelliJ',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Webstorm',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Visual Code',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Balsamiq Mockups',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Adobe Photoshop',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }
      ]
    },
    {
      category: 'Ipad Apps',
      items: [
        {
          name: 'AWS Console',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'AWS Workspaces',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Prompt',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Working Copy',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }
      ]
    },
    {
      category: 'API Integrations',
      items: [
        {
          name: 'Microsoft Graph API',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Airtable',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        },
        {
          name: 'Zoom',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Google Places',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Twilio',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Mailchimp',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Paypal',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Jotforms',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }, {
          name: 'Google Analytics',
          skillLevel: '',
          since: '',
          lastUsed: '',
          lastUsedDescription: ''
        }
      ]
    }
  ]


  constructor() {
  }

  ngOnInit(): void {
  }

}
