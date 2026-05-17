export interface SaveSaving {
    initialBalance: number;
    interestRate:   number;
    customerId:     number;
    accountStatus:  'CREATED' | 'ACTIVATED' | 'SUSPENDED';
}