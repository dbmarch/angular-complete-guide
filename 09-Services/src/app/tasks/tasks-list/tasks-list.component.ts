import { Component, signal, inject, computed } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';
import {TasksServiceToken} from '../../../main';


@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrl: './tasks-list.component.css',
    standalone: true,
    imports: [TaskItemComponent],
    providers : [taskStatusOptionsProvider]
})
export class TasksListComponent {
  private tasksService = inject<TasksService>(TasksServiceToken);
  selectedFilter = signal<string>('all');
  // tasks = this.tasksService.allTasks;
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  tasks = computed(() => {
    const filter = this.selectedFilter();
    const allTasks = this.tasksService.allTasks();
    if (filter === 'all') {
      return allTasks;
    } 
    return allTasks.filter(task => task.status === filter);
  })

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
