import { Component, inject, input, computed} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DestroyRef } from '@angular/core';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  // This will be set by angular router
  userId = input.required<string>();
  message = input.required<string>(); // use the same name as in the data field of the static route.
  userName = input.required<string>();
  
  // not needed with resolve user name.
  // private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  // userName = ''; // For observable based query params
  
  // use computed or paramMap below
  // userName = computed(() => {
  //   const user = this.usersService.users.find(user => user.id === this.userId());
  //   return user ? user.name : 'Unknown User';
  // });

// This is not needed if we use resolveUserName
ngOnInit(): void {
    const subscription =this.activatedRoute.data.subscribe({
      next: data => {
      // To view both static and dynamic data ( if not using inputs)
        console.log(data);
      }
    })

//     // snapshot will not change in ngOnInit.  
//     // It contains values vs observable.
//     console.log(this.activatedRoute.snapshot)
//     const subscription = this.activatedRoute.paramMap.subscribe({
//       next: (paramMap) => { 
//         this.userName = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || ''
//       }
//     }
//     );
     this.destroyRef.onDestroy(() => subscription.unsubscribe());
  } 
}


// This simplifies the user component by supplying the data via a dynamic data field
export const resolveUserName: ResolveFn<string> = (
      activatedRoute: ActivatedRouteSnapshot, 
      routeState: RouterStateSnapshot
    ) => {
      const usersService = inject(UsersService);
      const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';

      return userName;
};