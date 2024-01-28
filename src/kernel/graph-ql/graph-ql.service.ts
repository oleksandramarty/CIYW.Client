import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Store} from "@ngxs/store";
import {SetUserBalance} from "../store/actions/user.actions";
import {IInvoiceResponse, IBaseSortableQuery, IPaginator, IUserResponse, IUsersQuery} from "../services/api-client";
import {Observable, tap} from "rxjs";
import {
  USER_BALANCE_QUERY,
  USER_INVOICE_QUERY,
  USER_INVOICES_QUERY,
  CREATE_USER_INVOICE,
  ADMIN_USERS_QUERY, USER_BY_ID_FOR_ADMIN, CREATE_USER_BY_ADMIN, UPDATE_USER_BY_ADMIN
} from "./graph-ql.query";
import {ApolloQueryResult} from "@apollo/client";
import {IListWithIncludeHelper} from "../models/common.model";
import {IInvoiceType} from "../models/invoice.model";
import type {MutationResult} from "apollo-angular/types";
import {IUserType} from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(
    private apollo: Apollo,
    private store: Store) {
  }

  public createInvoice(
    name: string,
    amount: number,
    categoryId: string,
    currencyId: string,
    date: string,
    type: string,
    noteName: string,
    noteBody: string
  ): Observable<MutationResult<IInvoiceResponse | undefined>> {
    return this.apollo
      .mutate({
        mutation: CREATE_USER_INVOICE,
        variables: {
          input: {
            name,
            amount,
            categoryId,
            currencyId,
            date,
            type,
            note: !noteName && !noteBody ? null : {
              name: noteName,
              body: noteBody,
            },
          },
        },
      });
  }

  public getUserInvoice(id: string | null): Observable<ApolloQueryResult<{ invoice: IInvoiceResponse | undefined }>> {
    return this.apollo
      .watchQuery({
        query: USER_INVOICE_QUERY,
        variables: {
          id: id!,
        },
        fetchPolicy: 'network-only',
      }).valueChanges as Observable<ApolloQueryResult<{ invoice: IInvoiceResponse | undefined }>>;
  }

  public getUserById(id: string | null): Observable<ApolloQueryResult<{ userByIdForAdmin: IUserResponse | undefined }>> {
    return this.apollo
      .watchQuery({
        query: USER_BY_ID_FOR_ADMIN,
        variables: {
          id: id!,
        },
        fetchPolicy: 'network-only',
      }).valueChanges as Observable<ApolloQueryResult<{ userByIdForAdmin: IUserResponse | undefined }>>;
  }

  public getUserBalance(userId: string | null): void {
    this.apollo
      .watchQuery({
        query: USER_BALANCE_QUERY,
        variables: { userId },
        fetchPolicy: 'network-only'
      }).valueChanges.subscribe((result: any) => {
        this.store.dispatch(new SetUserBalance({
          amount: result?.data?.userBalance?.amount,
          isoCode: result?.data?.userBalance?.currency?.isoCode,
          symbol: result?.data?.userBalance?.currency?.symbol
        }));
    });
  }

  public getUserInvoices(
    paginator: IPaginator | undefined,
    sort: IBaseSortableQuery | undefined): Observable<ApolloQueryResult<{ invoices: IListWithIncludeHelper<IInvoiceType> | undefined }>> {
    let sortColumn = sort?.column ?? 'Created';
      return this.apollo
        .watchQuery({
          query: USER_INVOICES_QUERY,
          variables: {
            isFull: paginator?.isFull ?? false,
            pageNumber: paginator?.pageNumber ?? 1,
            pageSize: paginator?.pageSize ?? 5,
            dateFrom: null,
            dateTo: null,
            parentClass: sort?.parentClass,
            column: `${sortColumn === 'Date' ? 'Created' : sortColumn}`,
            direction: `${sort?.direction ?? 'desc'}`
          },
          fetchPolicy: 'network-only',
        }).valueChanges as Observable<ApolloQueryResult<{ invoices: IListWithIncludeHelper<IInvoiceType> | undefined }>>;
  }

  public getAdminUsers(
    query: IUsersQuery): Observable<ApolloQueryResult<{ users: IListWithIncludeHelper<IUserType> | undefined }>> {
    let sortColumn = query.sort?.column ?? 'Created';
    return this.apollo
      .watchQuery({
        query: ADMIN_USERS_QUERY,
        variables: {
          isFull: query.paginator?.isFull ?? false,
          pageNumber: query.paginator?.pageNumber ?? 1,
          pageSize: query.paginator?.pageSize ?? 5,
          dateFrom: null,
          dateTo: null,
          parentClass: query.sort?.parentClass,
          column: `${sortColumn === 'Date' ? 'Created' : sortColumn}`,
          direction: `${query.sort?.direction ?? 'desc'}`,
          isBlocked: query.isBlocked,
          phone: query.phone,
          email: query.email,
          login: query.login,
          name: query.name,
          createdRangeFrom: query.createdRange?.dateFrom,
          createdRangeTo: query.createdRange?.dateTo,
          updatedRangeFrom: query.updatedRange?.dateFrom,
          updatedRangeTo: query.updatedRange?.dateTo,
          currencyIds: query.currencyIds?.ids,
          roleIds: query.roleIds?.ids,
          tariffIds: query.tariffIds?.ids,
        },
        fetchPolicy: 'network-only',
      }).valueChanges as Observable<ApolloQueryResult<{ users: IListWithIncludeHelper<IUserType> | undefined }>>;
  }

  public createUserByAdmin(
    lastName: string,
    firstName: string,
    patronymic: string,
    login: string,
    email: string,
    phone: string,
    confirmEmail: string,
    isAgree: boolean,
    password: string,
    confirmPassword: string,
    isAgreeDigest: boolean,
    isTemporaryPassword: boolean,
    tariffId: string,
    currencyId: string
  ): Observable<MutationResult<IUserResponse | undefined>> {
    return this.apollo
      .mutate({
        mutation: CREATE_USER_BY_ADMIN,
        variables: {
          input: {
            lastName,
            firstName,
            patronymic,
            login,
            email,
            phone,
            confirmEmail,
            isAgree,
            password,
            confirmPassword,
            isAgreeDigest,
            isTemporaryPassword,
            tariffId,
            currencyId,
          },
        },
      });
  }

  public updateUserByAdmin(
    id: string,
    lastName: string,
    firstName: string,
    patronymic: string,
    login: string,
    email: string,
    phone: string,
    confirmEmail: string,
    isAgree: boolean,
    password: string,
    confirmPassword: string,
    isAgreeDigest: boolean,
    isTemporaryPassword: boolean,
    tariffId: string,
    currencyId: string
  ): Observable<MutationResult<IUserResponse | undefined>> {
    return this.apollo
      .mutate({
        mutation: UPDATE_USER_BY_ADMIN,
        variables: {
          id,
          input: {
            lastName,
            firstName,
            patronymic,
            login,
            email,
            phone,
            confirmEmail,
            isAgree,
            password,
            confirmPassword,
            isAgreeDigest,
            isTemporaryPassword,
            tariffId,
            currencyId,
          },
        },
      });
  }
}



