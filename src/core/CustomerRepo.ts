import Customer from "./Customer";

export default interface CustomerRepo {
  create(customer: Customer): Promise<Customer | undefined>;
  findAll(): Promise<Customer[]>;
  delete(customer: Customer): Promise<void>;
}
