import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout/layout.component";
import {PageNotFoundComponent} from "./pages/error/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      }
    ]
  }, {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      }
    ]
  }, {
    path: 'resume',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/resume/resume.module').then(m => m.ResumeModule)
      }
    ]
  }, {
    path: 'blog',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
      }
    ]
  }, {
    path: 'presentations',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/presentations/presentations.module').then(m => m.PresentationsModule)
      }
    ]
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    relativeLinkResolution: 'corrected',
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
