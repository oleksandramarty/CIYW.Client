import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalRService} from "../../../../kernel/services/signalR.service";
import {SignalRMessageTypeEnum} from "../../../../kernel/enums/signalR-message-type.enum";
import {Subject, takeUntil, tap} from "rxjs";
import {
  ApiClient, BaseSortableQuery,
  IUserResponse, IUsersQuery,
  Paginator,
  UserResponseListWithIncludeHelper,
  UsersQuery
} from "../../../../kernel/services/api-client";
import {MatSnackBar} from "@angular/material/snack-bar";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";
import {GraphQLService} from "../../../../kernel/graph-ql/graph-ql.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CIYWTableDialogEnum} from "../../../../kernel/enums/ciyw-table.enum";

@Component({
  selector: 'ciyw-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public chatForm: FormGroup | undefined;

  public users: UserResponseListWithIncludeHelper | undefined;

  public messages: {message: string, time: string, from: string, avatar: string}[] = [];

  constructor(
    private readonly signalR: SignalRService,
    private readonly apiClient: ApiClient,
    private readonly snackBar: MatSnackBar,
    private graphQlService: GraphQLService,
  ) {
  }


  ngOnInit(): void {
    this.graphQlService.getAdminUsers({
      isBlocked: false,
      phone: '',
      email: '',
      login: '',
      name: '',
      paginator: { pageNumber: 1, pageSize: 20, isFull: false} as Paginator,
      sort: { column: 'Created', direction: 'asc' } as BaseSortableQuery,
    } as IUsersQuery)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((result) => {
          this.users = result?.data?.users as UserResponseListWithIncludeHelper;
        }),
        handleApiError(this.snackBar)
      ).subscribe();


    this.signalR.connectionStatus$.subscribe((status) => {
      if (status && this.signalR.hubConnection) {
        this.signalR.hubConnection.on(SignalRMessageTypeEnum.SendToChat, (message: any) => {
          console.log(SignalRMessageTypeEnum.SendToChat, message);
          this.messages.push({message: message, time: this.humanize(new Date()), from: 'System Info', avatar: 'SI'})
        });

        this.signalR.hubConnection.invoke(SignalRMessageTypeEnum.AddToChat)
          .catch((err) => console.error(err));
      }
    });

    this.chatForm = new FormGroup({});
    this.chatForm.addControl('message', new FormControl(null, Validators.required));
  }

  public sendMessage(): void {
    if (this.signalR.hubConnection) {
      this.signalR.hubConnection.invoke(SignalRMessageTypeEnum.SendToChat, this.chatForm?.value.message)
        .catch((err) => console.error(err));
    }
  }

  ngOnDestroy(): void {
    if (this.signalR.hubConnection) {
      this.signalR.hubConnection.invoke(SignalRMessageTypeEnum.RemoveFromChat)
        .catch((err) => console.error(err));
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private humanize(dateTime: Date): string {
    const timeAgo: number = (new Date().getTime() - dateTime.getTime() - dateTime.getTimezoneOffset() * 60 * 1000) / (60 * 1000);

    if (timeAgo < 1)
      return 'just now';

    if (timeAgo < 60)
      return `${Math.floor(timeAgo)} minute${this.getPlural(Math.floor(timeAgo))} ago`;

    if (timeAgo < 60 * 24)
      return `${Math.floor(timeAgo / 60)} hour${this.getPlural(Math.floor(timeAgo / 60))} ago`;

    if (timeAgo < 60 * 24 * 30)
      return `${Math.floor(timeAgo / (60 * 24))} day${this.getPlural(Math.floor(timeAgo / (60 * 24)))} ago`;

    if (timeAgo < 60 * 24 * 365)
      return `${Math.floor(timeAgo / (60 * 24 * 30))} month${this.getPlural(Math.floor(timeAgo / (60 * 24 * 30)))} ago`;

    return `${Math.floor(timeAgo / (60 * 24 * 365))} year${this.getPlural(Math.floor(timeAgo / (60 * 24 * 365)))} ago`;
  }

  private getPlural(value: number): string {
    return value !== 1 ? 's' : '';
  }

  protected readonly tableBtn = CIYWTableDialogEnum;
}
