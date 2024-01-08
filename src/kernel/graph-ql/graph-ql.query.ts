import {gql} from "@apollo/client/core";

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
    $column: String,
    $direction: String
  ) {
    invoices(
      isFull: $isFull,
      pageNumber: $pageNumber,
      pageSize: $pageSize,
      dateFrom: $dateFrom,
      dateTo: $dateTo,
      column: $column,
      direction: $direction
    ) {
      entities {
        amount,
        date,
        humanize_date,
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
