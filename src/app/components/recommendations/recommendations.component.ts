import { Component, OnInit } from '@angular/core';

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

  industryExperts:IIndustryExpert[] = [
    {
      name: 'Dr Heinz M. Kabutz',
      expertise: ['Advanced Java','Patterns'],
      website: 'https://www.javaspecialists.eu/',
      target: '_external',
      picUrl: 'https://www.filepicker.io/api/file/WA9EOsGoRhG687gr1TlS'
    },{
      name: 'Eugen Baeldung',
      expertise: ['Spring REST', 'Spring Security','Spring Data'],
      website: 'https://www.baeldung.com/',
      target: '_external',
      picUrl: 'https://www.baeldung.com/wp-content/uploads/2018/02/photo-eugen.png'
    },{
      name: 'Vlad Mihalcea',
      expertise: ['Java','Hibernate','JPA','JDBC'],
      website: 'https://vladmihalcea.com/',
      target: '_external',
      picUrl: 'https://avatars.githubusercontent.com/u/5571399?v=4'
    },{
      name: 'Philip Rieckpil',
      expertise: ['Spring','Java', 'Testing'],
      website: 'https://rieckpil.de/',
      target: '_external',
      picUrl: 'https://cdn-aoloc.nitrocdn.com/LjZAnpMBiKRdWkhommfnyugsAOnHWdxL/assets/static/optimized/rev-ec83180/wp-content/uploads/2020/07/rieckpilParkBench-585x703.jpg.webp'
    },{
      name: 'Dmytro Mezhenskyi',
      expertise: ['Angular','RXJS'],
      website: 'https://www.decodedfrontend.io/',
      target: '_external',
      picUrl: 'https://pbs.twimg.com/profile_images/1428302019777998855/FePGJNv5_400x400.jpg'
    },{
      name: 'Basarat Ali Syed',
      expertise: ['Typescript'],
      website: 'https://basarat.com/',
      target: '_external',
      picUrl: 'https://avatars.githubusercontent.com/u/874898?v=4'
    },{
      name: 'Borislav Hadzhiev',
      expertise: ['AWS', 'CDK', 'Javascript',],
      website: 'https://bobbyhadz.com/',
      target: '_external',
      picUrl: 'https://bobbyhadz.com/images/global/avatar-big.webp'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
