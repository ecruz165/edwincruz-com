import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpRequestDataService} from "../../services/http-request-data.service";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  url = '/docs/resume/edwin-m-cruz.md';
  baseUrl: string;
  constructor(private httpClient: HttpClient,
              private httpRequestDataService: HttpRequestDataService) {


    this.baseUrl = httpRequestDataService.getApplicationUrl();
    this.url = this.baseUrl+this.url;
  }

  ngOnInit(): void {
  }

}
