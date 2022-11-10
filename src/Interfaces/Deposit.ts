import { BankName } from "../Enums/BankName";

export interface IDeposit {
  bank_name: BankName;
  amount: number;
}
