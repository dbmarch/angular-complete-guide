import { Injectable, signal, inject} from '@angular/core'
import { Task } from './task.model';
import { TaskStatus } from './task.model';   
import { LoggingService } from '../logging.service';

// Comment out and added to main.ts for global singleton instance
// @Injectable({
//    providedIn: 'root'
// })
export class TasksService{
   private tasks = signal<Task[]>([]);
   allTasks = this.tasks.asReadonly();
   private loggingService = inject(LoggingService);


   
   addTask(taskData: {title: string; description: string;}) {
      const newTask:Task = {
         ...taskData,
         id: Math.random().toString(),
         status: 'OPEN'
      };
      this.tasks.update((oldTasks)=>[...oldTasks, newTask])
      this.loggingService.log('ADDED TASK WITH TITLE ' + taskData.title);
   }

   updateTaskStatus(taskId: string, newStatus: TaskStatus) {
      this.tasks.update((oldTasks) => oldTasks.map(task => task.id === taskId ? {...task, status: newStatus} : task));
      this.loggingService.log('CHANGED TASK WITH STATUS ' + newStatus);

   }
}
