import Customer from "@/core/Customer";
import { EditIcon, TrashIcon } from "./icons";

interface TableProps {
  customers: Customer[];
  selectedCustomer?: (customer: Customer) => void;
  deletedCustomer?: (customer: Customer) => void;
}

export default function Table(props: TableProps) {
  const showActions = props.selectedCustomer || props.deletedCustomer;
  function headerRender() {
    return (
      <tr>
        <th className="text-left p-4">Id</th>
        <th className="text-left p-4">Name</th>
        <th className="text-left p-4">Age</th>
        {showActions && <th className="p-4">Ações</th>}
      </tr>
    );
  }

  function dataRender() {
    return props.customers?.map((customer, i) => (
      <tr
        key={customer.id}
        className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
      >
        <td className="text-left p-4">{customer.id}</td>
        <td className="text-left p-4">{customer.name}</td>
        <td className="text-left p-4">{customer.age}</td>
        {showActions && actionsRender(customer)}
      </tr>
    ));
  }

  function actionsRender(customer: Customer) {
    return (
      <td className="flex justify-center">
        {props.selectedCustomer && (
          <button
            onClick={() => props.selectedCustomer?.(customer)}
            className={`flex justify-center items-center text-green-600 rounded-full hover:bg-purple-50 p-2 m-1`}
          >
            {EditIcon}
          </button>
        )}

        {props.deletedCustomer && (
          <button
            onClick={() => props.deletedCustomer?.(customer)}
            className={`flex justify-center items-center text-red-500 rounded-full hover:bg-purple-50 p-2 m-1`}
          >
            {TrashIcon}
          </button>
        )}
      </td>
    );
  }
  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead
        className={`
        text-gray-100
        bg-gradient-to-r from-purple-500 to-purple-800
      `}
      >
        {headerRender()}
      </thead>
      <tbody>{dataRender()}</tbody>
    </table>
  );
}
