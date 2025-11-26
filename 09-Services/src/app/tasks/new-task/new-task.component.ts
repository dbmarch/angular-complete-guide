import { Component, ElementRef, viewChild, Inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksServiceToken } from '../../../main';
import { TasksService } from '../tasks.service';

@Component({
    selector: 'app-new-task',
    imports: [FormsModule],
    standalone: true,
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  
  constructor( @Inject(TasksServiceToken) private tasksService: TasksService) {
  }

  onAddTask(title: string, description: string) {
    this.tasksService.addTask({title, description});
    this.formEl()?.nativeElement.reset();
  }
}
