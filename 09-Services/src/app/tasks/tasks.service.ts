import { Injectable, signal} from '@angular/core'
import { Task } from './task.model';
import { TaskStatus } from './task.model';

// Comment out and added to main.ts for global singleton instance
@Injectable({
   providedIn: 'root'
})
export class TasksService{
   private tasks = signal<Task[]>([]);
   allTasks = this.tasks.asReadonly();

   
   addTask(taskData: {title: string; description: string;}) {
      const newTask:Task = {
         ...taskData,
         id: Math.random().toString(),
         status: 'OPEN'
      };
      this.tasks.update((oldTasks)=>[...oldTasks, newTask])
   }

   updateTaskStatus(taskId: string, newStatus: TaskStatus) {
      this.tasks.update((oldTasks) => oldTasks.map(task => task.id === taskId ? {...task, status: newStatus} : task));
   }
}
