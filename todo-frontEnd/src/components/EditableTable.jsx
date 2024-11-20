import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditableTable = () => {
  // Sample product data
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 1500.0 },
    { id: 2, name: "Smartphone", price: 800.0 },
    { id: 3, name: "Tablet", price: 500.0 },
  ]);

  const [editingRow, setEditingRow] = useState(null); // Tracks which row is being edited
  const [editableData, setEditableData] = useState([...products]); // Copy of products for editing
  const [newProduct, setNewProduct] = useState({ name: "", price: 0 }); // New product form state
  const [showAdd, setShowAdd] = useState(false);

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...editableData];
    updatedData[index][field] = value;
    setEditableData(updatedData);
  };

  const handleSave = async (index) => {
    const updatedProduct = editableData[index];
    try {
      // Send PUT request to backend API to update product
      const response = await axios.put(
        `http://localhost:5000/api/products/${updatedProduct.id}`, // Replace with your backend API URL
        updatedProduct
      );

      // Assuming successful update, replace the old product in state with updated data
      const updatedProducts = [...products];
      updatedProducts[index] = response.data; // Assuming the API returns the updated product
      setProducts(updatedProducts);

      // Exit edit mode
      setEditingRow(null);
    } catch (error) {
      console.error("There was an error updating the product:", error);
    }
  };

  const handleNewProductChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleAdd = async () => {
    if (!newProduct.name || newProduct.price <= 0) {
      alert("Please provide valid name and price.");
      return;
    }
    setShowAdd(false);
    try {
      //   const response = await axios.post(
      //     "http://localhost:5000/api/products",
      //     newProduct
      //   );
      //   const addedProduct = response.data;
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setEditableData((prev) => [...prev, newProduct]);
      setNewProduct({ name: "", price: 0 });
    } catch (error) {
      console.error("There was an error adding the product:", error);
    }
  };

  const handleShow = () => {
    setShowAdd(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center my-4">Product List</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {editableData.map((product, index) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingRow === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={product.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingRow === index ? (
                  <input
                    type="number"
                    className="form-control"
                    value={product.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editingRow === index ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Form */}
      {showAdd && (
        <>
          <h3>Add New Product</h3>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={newProduct.name}
              onChange={(e) => handleNewProductChange("name", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={newProduct.price}
              onChange={(e) => handleNewProductChange("price", e.target.value)}
            />
          </div>
        </>
      )}
      <div className="mt-4">
        {!showAdd && (
          <button className="btn btn-success" onClick={handleShow}>
            {/* {newProduct?.name === null ? "Save Product" : "Add"} */}
            Add New
          </button>
        )}
        {showAdd && (
          <button className="btn btn-success" onClick={handleAdd}>
            Save Product
          </button>
        )}
      </div>
    </div>
  );
};

export default EditableTable;
