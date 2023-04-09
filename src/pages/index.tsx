import Button from "@/components/Button";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import Table from "@/components/Table";

import useCustomers from "@/hooks/useCustomers";

export default function Home() {
  const {
    customer,
    customers,
    isTableVisible,
    deletedCustomer,
    newCustomer,
    saveCustomer,
    selectedCustomer,
    showTable,
  } = useCustomers();

  return (
    <div
      className={`
    flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white
    `}
    >
      <Layout title="Simple Register">
        {isTableVisible ? (
          <>
            <div className="flex justify-end">
              <Button className="mb-4" color="green" onClick={newCustomer}>
                New Customer
              </Button>
            </div>
            <Table
              customers={customers}
              selectedCustomer={selectedCustomer}
              deletedCustomer={deletedCustomer}
            />
          </>
        ) : (
          <Form
            customer={customer}
            cancel={() => showTable()}
            onChangeCustomer={saveCustomer}
          />
        )}
      </Layout>
    </div>
  );
}
