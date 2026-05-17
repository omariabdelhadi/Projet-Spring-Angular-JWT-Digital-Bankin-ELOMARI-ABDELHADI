export interface BankAccountCustomer {
  id:           string;
  balance:      number;
  createAt:     Date;
  status:       'CREATED' | 'ACTIVATED' | 'SUSPENDED';
  interestRate: number;
  overDraft:    number;
  TypeAccount:  string;
}