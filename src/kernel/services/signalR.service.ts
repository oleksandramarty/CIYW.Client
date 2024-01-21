import {Injectable} from "@angular/core";
import * as signalR from '@microsoft/signalr';
import {environment} from "../environments/environment";
import {SignalRMessageTypeEnum} from "../enums/signalR-message-type.enum";
import {UserState} from "../store/state/user.state";

@Injectable()
export class SignalRService {
  private hubConnection: signalR.HubConnection | undefined;

  get token(): string {
    return UserState.localRememberMeStatus
      ? UserState.localToken
      : UserState.sessionToken || '';
  }

  public start(): void {
    if (!!this.hubConnection) {
      return;
    }
    const tokenValue = this.token;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hub`, {
        logger: 6, //None
        accessTokenFactory: () => {
          return tokenValue;
        },
      })
      .build();

     this.hubConnection.start()
      .then(() => console.log('SignalR connection started.'))
      .catch(err => console.log('Error while starting SignalR connection: ', err));

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
