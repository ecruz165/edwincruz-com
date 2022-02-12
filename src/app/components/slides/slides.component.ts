import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  async ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      const requiredRevealLib = require('reveal.js');
      const RevealMarkdown = require('reveal.js/plugin/markdown/markdown.js');
      const RevealHighlight = require('reveal.js/plugin/highlight/highlight.js');


      const Reveal = requiredRevealLib.default;

      Reveal.initialize({
        plugins: [RevealMarkdown, RevealHighlight],

        // Factor of the display size that should remain empty around
        // the content
        margin: 0.04,
        // Bounds for smallest/largest possible scale to apply to content
        minScale: 0.2,
        maxScale: 2.0,
        controlsLayout: "bottom-right",
        controls: true,
        progress: true,
        embedded: true,
        showSlideNumber: "all"
      });
    }
  }

}

/*
export function normalizeCommonJSImport<T>(
  importPromise: Promise<T>,
): Promise<T> {
  return importPromise.then((m: any) => (m.default || m) as T
  );
}
*/
