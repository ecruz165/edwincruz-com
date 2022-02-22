import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export interface DialogData {
  email: string;
  sms: string;
  qrCodePath: string;
  vCardPathForIos: string;
  vCardPathForAndroid: string;
  vCardPathForWindows: string;
}

@Component({
  selector: 'app-contact-me-dialog',
  templateUrl: './contact-me-dialog.component.html',
  styleUrls: ['./contact-me-dialog.component.scss']
})
export class ContactMeDialogComponent implements OnInit {

  public qrCodeContent:string='https://edwincruz.com/assets/contact-card/contact-card-ios.vcf';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // @ts-ignore
    if (1===1) {
      this.qrCodeContent = "BEGIN:VCARD\n" +
        "VERSION:3.0\n" +
        "FN:Edwin Manuel Cruz\n" +
        "N:Cruz;Edwin;Manuel;;\n" +
        "X-PHONETIC-FIRST-NAME:19176267137\n" +
        "EMAIL;TYPE=INTERNET;TYPE=HOME:ecruz165@yahoo.com\n" +
        "TEL;TYPE=CELL:(917) 626-7137\n" +
        "item1.ADR:;;;New York;NY;10032;US;New York\\, NY 10032\\nUS\n" +
        "item1.X-ABLabel:\n" +
        "item2.ORG:Edwin Cruz\n" +
        "item2.X-ABLabel:\n" +
        "item3.TITLE:Lead Software Engineer\n" +
        "item3.X-ABLabel:\n" +
        "item4.URL:https\\://edwincruz.com\n" +
        "item4.X-ABLabel:homePage\n" +
        "PHOTO:https://edwincruz.com/assets/pic-profile-light.jpg\n" +
        "CATEGORIES:Lead Software Engineers,myContacts,starred\n" +
        "END:VCARD\n";
    }
  }

  ngOnInit(): void {
  }



}
