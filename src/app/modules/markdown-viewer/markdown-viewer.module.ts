import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarkdownViewerComponent} from "./markdown-viewer.component";



@NgModule({
  declarations: [MarkdownViewerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MarkdownViewerComponent
  ]
})
export class MarkdownViewerModule { }
