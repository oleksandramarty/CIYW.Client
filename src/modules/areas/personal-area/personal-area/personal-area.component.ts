import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../../kernel/store/state/user.state";
import {Observable, Subject, Subscription, switchMap, takeUntil, tap} from "rxjs";
import {HomeRedirect, ResetUser, SetAvatar, SetToken, SetUser} from "../../../../kernel/store/actions/user.actions";
import {ApiClient, AuthLoginQuery, IDictionariesResponse} from "../../../../kernel/services/api-client";
import {handleApiError} from "../../../../kernel/helpers/rxjs.helper";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SetDictionaries} from "../../../../kernel/store/actions/dictionary.actions";

@Component({
  selector: 'ciyw-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrl: './personal-area.component.scss'
})
export class PersonalAreaComponent {
}
