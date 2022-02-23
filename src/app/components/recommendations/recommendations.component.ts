import {Component, OnInit} from '@angular/core';

interface IIndustryExpert {
  name: string,
  expertise: string[],
  website: string,
  target: string,
  picUrl: string
}

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  industryExperts: IIndustryExpert[] = [
    {
      name: 'Dr Heinz M. Kabutz',
      expertise: ['Advanced Java', 'Patterns'],
      website: 'https://www.javaspecialists.eu/',
      target: '_external',
      picUrl: '/assets/pics/dr-heinz-m-kabutz-200.jpg'
    }, {
      name: 'Eugen Baeldung',
      expertise: ['Java', 'Spring','Security'],
      website: 'https://www.baeldung.com/',
      target: '_external',
      picUrl: '/assets/pics/eugen-baeldung-200.jpg'
    }, {
      name: 'Vlad Mihalcea',
      expertise: ['Java', 'Hibernate', 'JPA', 'JDBC'],
      website: 'https://vladmihalcea.com/',
      target: '_external',
      picUrl: '/assets/pics/vlad-mihalcea-200.jpg'
    }, {
      name: 'Philip Rieckpil',
      expertise: ['Spring', 'Java', 'Testing'],
      website: 'https://rieckpil.de/',
      target: '_external',
      picUrl: '/assets/pics/philip-rieckpil-200.jpg'
    }, {
      name: 'Dmytro Mezhenskyi',
      expertise: ['Angular', 'RXJS'],
      website: 'https://www.decodedfrontend.io/',
      target: '_external',
      picUrl: '/assets/pics/dmytro-mezhenskyi-200.jpg'
    }, {
      name: 'Basarat Ali Syed ',
      expertise: ['Typescript'],
      website: 'https://basarat.com/',
      target: '_external',
      picUrl: '/assets/pics/basarat-ali-syed-200.jpg'
    }, {
      name: 'Borislav Hadzhiev',
      expertise: ['AWS', 'CDK', 'Javascript',],
      website: 'https://bobbyhadz.com/',
      target: '_external',
      picUrl: '/assets/pics/borislav-hadzhiev-200.jpg'
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
