import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from "./pages/blog/blog.component";
import {ResumeComponent} from "./pages/resume/resume.component";
import {HomeComponent} from "./pages/home/home.component";
import {SlidesComponent} from "./components/slides/slides.component";
import {PresentationsComponent} from "./pages/presentations/presentations.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'resume',
    component: ResumeComponent
  }, {
    path: 'blog',
    component: BlogComponent
  }, {
    path: 'slides',
    component: SlidesComponent
  },{
    path: 'presentations',
    component: PresentationsComponent
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
