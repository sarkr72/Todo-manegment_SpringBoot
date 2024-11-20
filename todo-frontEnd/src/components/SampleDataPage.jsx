import React, { useState } from "react";
import EditableTable from "./EditableTable";

const SampleDataPage = () => {
  const [products] = useState([
    { id: 1, name: "Laptop", price: 1500.0 },
    { id: 2, name: "Smartphone", price: 800.0 },
    { id: 3, name: "Tablet", price: 500.0 },
  ]);

  const updateProduct = (updatedProduct) => {
    console.log("Updated Product:", updatedProduct);
  };

  return (
    <div>
      <EditableTable products={products} onUpdate={updateProduct} />
    </div>
  );
};

export default SampleDataPage;
