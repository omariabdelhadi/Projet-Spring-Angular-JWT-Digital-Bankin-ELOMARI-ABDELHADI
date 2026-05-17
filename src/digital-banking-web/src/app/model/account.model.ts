export interface AccountDetails {
  accountId:             string;
  balance:               number;
  name_client:           string;
  currentPage:           number;
  totalePage:            number;
  pageSize:              number;
  accountOperationDTOS:  AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  amount:        number;
  description:   string;
  operationDate: string;
  type:          string;
}