
import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import { gql } from "@apollo/client/core"
import {Store} from "@ngxs/store";
import {SetUserBalance} from "../store/actions/user.actions";

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(
    private apollo: Apollo,
    private store: Store) {
  }

  public getUserBalance(userId: string | null): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            userBalance (userId: "${userId}") {
              amount,
              currency {
                isoCode,
                symbol
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.store.dispatch(new SetUserBalance({
          amount: result?.data?.userBalance?.amount,
          isoCode: result?.data?.userBalance?.currency?.isoCode,
          symbol: result?.data?.userBalance?.currency?.symbol
        }));
    });
  }
}
