export interface SaveCurrent {
    initialBalance: number;
    overDraft:      number;
    customerId:     number;
    accountStatus:  'CREATED' | 'ACTIVATED' | 'SUSPENDED';
}