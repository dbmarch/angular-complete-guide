import { Routes } from "@angular/router";
import { TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent, canLeaveEditPage, resolveUserTasks } from "../tasks/new-task/new-task.component";
import {  } from "../tasks/new-task/new-task.component";

export const routes: Routes = [
   {
      path: '',
      redirectTo:  'tasks',
      pathMatch: 'prefix'
   },
   {  path: 'tasks', 
      component: TasksComponent,
      runGuardsAndResolvers: 'always',
      resolve: {
         userTasks: resolveUserTasks
      }
   },
   {
      path: 'tasks/new',
      component: NewTaskComponent,
      canDeactivate: [canLeaveEditPage]
   },
];