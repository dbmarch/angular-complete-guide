import { inject } from "@angular/core";
import { Routes, CanMatchFn, RedirectCommand, Router } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { routes as userRoutes } from './users/users.routes'
import { resolveUserName, resolveTitle} from './users/user-tasks/user-tasks.component'

const dummyCanMatch: CanMatchFn = (route, segments) => {
   const router = inject(Router);
   
   const shouldGetAccess = Math.random();
   if (shouldGetAccess < 0.5 ) {
      return true;
   }
   return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
   {
      path: '',
      component: NoTaskComponent,
      title: 'No Task Selected'
   },
   {
      path: 'users/:userId', 
      component: UserTasksComponent,
      children: userRoutes,
      canMatch: [ dummyCanMatch ],
      data: {
         message: 'Hello'
      },
      runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      resolve: {
         userName: resolveUserName
      },
      title: resolveTitle,
   },
   {
      path: '**',
      component: NotFoundComponent
   }
]