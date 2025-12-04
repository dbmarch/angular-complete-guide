import { Component, inject, input, computed} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // This will be set by angular router
  userId = input.required<string>();
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  userName = '';

  // userName = computed(() => {
  //   const user = this.usersService.users.find(user => user.id === this.userId());
  //   return user ? user.name : 'Unknown User';
  // });

  ngOnInit(): void {
    console.log(this.activatedRoute)
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => { 
        this.userName = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || ''
      }
    }
    );
  } 
}
