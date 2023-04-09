import { useState } from "react";
import Input from "./Input";
import Customer from "@/core/Customer";
import Button from "./Button";

interface FormProps {
  customer?: Customer;
  cancel?: () => void;
  onChangeCustomer?: (customer: Customer) => void;
}

export default function Form(props: FormProps) {
  const id = props.customer?.id;
  const [name, setName] = useState(props.customer?.name ?? "");
  const [age, setAge] = useState(props.customer?.age ?? 0);
  return (
    <div>
      {id && <Input text="id" value={id} readOnly className="mb-4" />}
      <Input text="Name" value={name} onChange={setName} className="mb-4" />
      <Input text="Age" type="number" value={age} onChange={setAge} />
      <div className="flex justify-end mt-7">
        <Button
          color="blue"
          className="mr-2"
          onClick={() => props.onChangeCustomer?.(new Customer(name, age, id))}
        >
          {id ? "Change" : "Save"}
        </Button>
        <Button onClick={props.cancel}>Cancel</Button>
      </div>
    </div>
  );
}
