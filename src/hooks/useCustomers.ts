import CustomerCollection from "@/backend/db/CustomerCollection";
import Customer from "@/core/Customer";
import CustomerRepo from "@/core/CustomerRepo";
import { useEffect, useState } from "react";
import useTableOrForm from "./useTableOrForm";

export default function useCustomers() {
  const repo: CustomerRepo = new CustomerCollection();

  const [customer, setCustomer] = useState<Customer>(Customer.empty);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { isTableVisible, showForm, showTable } = useTableOrForm();
  useEffect(findAll, []);

  function findAll() {
    repo.findAll().then((responseCustomers) => {
      setCustomers(responseCustomers);
      showTable();
    });
  }

  function selectedCustomer(customer: Customer) {
    setCustomer(customer);
    showForm();
  }

  async function deletedCustomer(customer: Customer) {
    await repo.delete(customer);
    findAll();
  }

  function newCustomer() {
    setCustomer(Customer.empty());
    showForm();
  }

  async function saveCustomer(customer: Customer) {
    await repo.create(customer);
    findAll();
  }

  return {
    selectedCustomer,
    deletedCustomer,
    newCustomer,
    saveCustomer,
    showTable,
    customer,
    customers,
    isTableVisible,
  };
}
