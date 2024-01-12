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
