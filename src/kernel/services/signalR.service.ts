import {Injectable} from "@angular/core";
import * as signalR from '@microsoft/signalr';
import {environment} from "../environments/environment";
import {SignalRMessageTypeEnum} from "../enums/signalR-message-type.enum";
import {UserState} from "../store/state/user.state";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class SignalRService {
  public hubConnection: signalR.HubConnection | undefined;
  private connectionStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get token(): string {
    return UserState.localRememberMeStatus
      ? UserState.localToken
      : UserState.sessionToken || '';
  }

  get connectionStatus$(): Observable<boolean> {
    return this.connectionStatusSubject.asObservable();
  }

  public start(): void {
    if (!!this.hubConnection) {
      return;
    }
    const tokenValue = this.token;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hubs/messages`, {
        logger: 6, //None
        accessTokenFactory: () => {
          return tokenValue;
        },
      })
      .build();

     this.hubConnection.start()
      .then(() => {
        console.log('SignalR connection started.');
        this.connectionStatusSubject.next(true);
      })
      .catch(err => {
        console.log('Error while starting SignalR connection: ', err);
        this.connectionStatusSubject.next(false);
      });

    this.hubConnection.on(SignalRMessageTypeEnum.MessageToAllActiveUsers, (message: any) => {
      console.log(SignalRMessageTypeEnum.MessageToAllActiveUsers, message);
    });

    this.hubConnection.on(SignalRMessageTypeEnum.MessageToUser, (message: any) => {
      console.log(SignalRMessageTypeEnum.MessageToUser, message);
    });
  }

  public stop(): void {
    if (!this.hubConnection) {
      return;
    }
    this.hubConnection.stop()
      .then(() => console.log('SignalR connection stopped.'))
      .catch(err => console.log('Error while stopping SignalR connection: ', err));
  }
}
