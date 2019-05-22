import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AgendaComponent } from './agenda/agenda.component';
import { TodosComponent } from './todos/todos.component';
import { GoalsComponent } from './goals/goals.component';
import { ProjectsComponent } from './projects/projects.component';
import { IdeasComponent } from './ideas/ideas.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'ideas', component: IdeasComponent },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
 
}
