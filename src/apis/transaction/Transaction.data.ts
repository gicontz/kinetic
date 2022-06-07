export interface ITransaction {
  transactionId: number;
  date: Date;
}

export type TCreateTransaction = {
  id: number;
  date: Date;
};

export type TGetTransaction = {
  id: number;
};
