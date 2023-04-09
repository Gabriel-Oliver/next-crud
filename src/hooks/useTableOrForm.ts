import { useState } from "react";

export default function useTableOrForm() {
  const [show, setShow] = useState<"table" | "form">("table");

  const showTable = () => setShow("table");
  const showForm = () => setShow("form");

  return {
    isFormVisible: show === "form",
    isTableVisible: show === "table",
    showTable,
    showForm,
  };
}
