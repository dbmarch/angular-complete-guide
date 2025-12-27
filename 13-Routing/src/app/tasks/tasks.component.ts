import { Component, input, inject, computed, OnInit, DestroyRef, signal} from '@angular/core';
import { Router, RouterLink, ActivatedRoute} from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  private tasksService = inject(TasksService);
  
  // Input signal method to obtain query param:
  // readonly order = input<'asc' | 'desc'> ('asc');
  
  // Observervable method to obtain query param
  // order?: 'asc' | 'desc';

  // signal method to obtain query param:
  readonly order = signal<'asc' | 'desc'>('asc');


  userTasks = computed(() => 
      this.tasksService.allTasks()
        .filter((task) => task.userId === this.userId())
        .sort((a,b) => {
          if (this.order() === 'desc') {
            return a.id > b.id ? -1 : 1;
          } else {
            return a.id > b.id ? 1 : -1;
          }
        })
    );

  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {

    const subscription = this.activatedRoute.queryParams.subscribe ({
      next: params => this.order.set(params['order'])
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
  
