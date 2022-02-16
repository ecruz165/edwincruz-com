import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogLayoutComponent} from "./pages/blog/blog-layout.component";
import {PresentationsLayoutComponent} from "./pages/presentations/presentations-layout.component";
import {ResumeLayoutComponent} from "./pages/resume/resume-layout.component";
import {LayoutComponent} from "./layout/layout/layout.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
