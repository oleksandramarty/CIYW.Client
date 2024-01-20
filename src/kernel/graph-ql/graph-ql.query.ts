import {gql} from "@apollo/client/core";

export const CREATE_USER_INVOICE = gql`
  mutation CreateInvoice($input: InvoiceInput!) {
    createInvoice(input: $input) {
      id,
      name,
      amount,
      category {
        id
      }
      currency {
        id
      }
      date,
      type,
      note {
        id,
        name,
        body
      }
    }
  }
`;

export const USER_INVOICE_QUERY = gql`
  query GetInvoice($id: Guid) {
    invoice(id: $id) {
      name,
      amount,
      currencyId,
      categoryId,
      type,
      date,
      note {
        id,
        name,
        body
      }
    }
  }
`;
export const USER_BY_ID_FOR_ADMIN = gql`
  query GetUserByIdForAdmin($id: Guid) {
  userByIdForAdmin(id: $id) {
    id,
    login,
    lastName,
    firstName,
    patronymic,
    isTemporaryPassword,
    isBlocked,
    modified,
    lastForgot,
    tariffId,
    currencyId,
    userBalanceId,
    roleId,
    userBalance {
      amount,
      currencyId,
      currency {
        name,
        symbol
      }
    },
    email,
    created,
    updated,
    emailConfirmed,
    phoneNumber,
    phoneNumberConfirmed
  }
}
`;

export const USER_BALANCE_QUERY = gql`
  query GetUserBalance($userId: Guid) {
    userBalance(userId: $userId) {
      amount,
      currency {
        isoCode,
        symbol
      }
    }
  }
`;

export const USER_INVOICES_QUERY = gql`
  query GetInvoices(
    $isFull: Boolean,
    $pageNumber: Int,
    $pageSize: Int,
    $dateFrom: DateTime,
    $dateTo: DateTime,
    $parentClass: String,
    $column: String,
    $direction: String
  ) {
    invoices(
      isFull: $isFull,
      pageNumber: $pageNumber,
      pageSize: $pageSize,
      dateFrom: $dateFrom,
      dateTo: $dateTo,
      parentClass: $parentClass,
      column: $column,
      direction: $direction
    ) {
      entities {
        amount,
        date,
        humanize_date,
        modified,
        id,
        name,
        category {
          name
        }
      }
      paginator {
        pageNumber,
        pageSize
      }
      totalCount
    }
  }
`;

export const ADMIN_USERS_QUERY = gql`
  query GetInvoices(
    $isFull: Boolean,
    $pageNumber: Int,
    $pageSize: Int,
    $dateFrom: DateTime,
    $dateTo: DateTime,
    $parentClass: String,
    $column: String,
    $direction: String
  ) {
    users(
      isFull: $isFull,
      pageNumber: $pageNumber,
      pageSize: $pageSize,
      dateFrom: $dateFrom,
      dateTo: $dateTo,
      parentClass: $parentClass,
      column: $column,
      direction: $direction
    ) {
    entities {
        id,
        lastName,
        firstName,
        login,
        email,
        phoneNumber,
        modified,
        created,
        updated,
        userBalance {
          id,
          amount,
          currency {
            id,
            isoCode,
            symbol
          }
        }
      }
      paginator {
        pageNumber,
        pageSize
      }
      totalCount
  }
  }
`;

export const CREATE_USER_BY_ADMIN = gql`
  mutation CreateUserByAdmin($input: UserInput!) {
    createUserByAdmin(input: $input) {
      id
      login
      lastName
      firstName
      patronymic
      isTemporaryPassword
      isBlocked
      modified
      lastForgot
      tariffId
      currencyId
      userBalanceId
      roleId
      userBalance {
        amount
        currencyId
        currency {
          name
          symbol
        }
      }
      email
      created
      updated
      emailConfirmed
      phoneNumber
      phoneNumberConfirmed
    }
  }
`;

export const UPDATE_USER_BY_ADMIN = gql`
  mutation UpdateUserByAdmin($id: Guid!, $input: UserInput!) {
    updateUserByAdmin(id: $id, input: $input) {
      id
      login
      lastName
      firstName
      patronymic
      isTemporaryPassword
      isBlocked
      modified
      lastForgot
      tariffId
      currencyId
      userBalanceId
      roleId
      userBalance {
        amount
        currencyId
        currency {
          name
          symbol
        }
      }
      email
      created
      updated
      emailConfirmed
      phoneNumber
      phoneNumberConfirmed
    }
  }
`;
