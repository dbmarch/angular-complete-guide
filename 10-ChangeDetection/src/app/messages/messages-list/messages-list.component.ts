import { Component, ChangeDetectionStrategy, inject, ChangeDetectorRef, OnInit, DestroyRef} from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent implements OnInit {
  private messagesService = inject(MessagesService);
  private cdRef = inject(ChangeDetectorRef);

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.messagesService.messages$.subscribe((messages) => {
      this.cdRef.markForCheck();
      this.messages = messages;
    });

    // or we can unsubscribe here using the destroyRef
    this.destroyRef.onDestroy(() => {
      this.messagesService.messages$.unsubscribe();
    });
  }


  // Either use ngOnDestroy to unsubscribe
  ngOnDestroy() {
    // this.messagesService.messages$.unsubscribe();
  }

  messages: string[] = [];
  // messages = this.messagesService.allMessages;
  // get messages() {
  //   return this.messagesService.allMessages;
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
