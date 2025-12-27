import { Component, inject, input, computed} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
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
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  userName = ''; // For observable based query params
  message = input.required<string>(); // use the same name as in the data field of the static route.

  // use computed or paramMap below
  // userName = computed(() => {
  //   const user = this.usersService.users.find(user => user.id === this.userId());
  //   return user ? user.name : 'Unknown User';
  // });

  ngOnInit(): void {
    console.log ('message', this.message())
    // snapshot will not change in ngOnInit.  
    // It contains values vs observable.
    console.log(this.activatedRoute.snapshot)
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => { 
        this.userName = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || ''
      }
    }
    );
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  } 
}
