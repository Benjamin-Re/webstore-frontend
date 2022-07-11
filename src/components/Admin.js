import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context";
import "../styles/Admin.css";
import { ModifyForm } from "./ModifyForm";

export function Admin() {
  const { products, token } = useMyContext();
  const [getProducts, setProducts] = products;
  const [getToken, setToken] = token;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [getName, setName] = useState();
  const [getPrice, setPrice] = useState();
  const [getStock, setStock] = useState();
  const [getFile, setFile] = useState();
  const [getId, setId] = useState();


  return (
    <>
      <div className="outerContainer">
        <h2>Stock</h2>
        <table>
          <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity in Stock</th>
          </tr>
          </thead>
          <tbody>
          {getProducts.map((product) => {
            return (
              <>
                <tr key={product.name}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="delete"
                      onClick={function () {
                        handleDelete(product._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>{
                      setIsOpenUpdate(true);
                      setId(product._id);
                      setName(product.name);
                      setPrice(product.price);
                      setStock(product.stock);
                      }}>Update</button>
                  </td>
                </tr>
              </>
            );
          })}
          <tr>
            <td>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Add
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        {/*Add new Product*/}
        <ModifyForm
          open={isOpen}
          handleFile={handleFile}
          handleName={handleName}
          handlePrice={handlePrice}
          handleStock={handleStock}
          handleSubmit={handleSubmit}
          onClose={onClose}
        ></ModifyForm>
        {/*Update Product*/}
        <ModifyForm
          open={isOpenUpdate}
          handleFile={handleFile}
          handleName={handleName}
          handlePrice={handlePrice}
          handleStock={handleStock}
          handleSubmit={handleSubmitUpdate}
          onClose={onCloseUpdate}
        ></ModifyForm>
      </div>
    </>
  );

  function handleName(e) {
    setName(e.target.value);
  }
  function handlePrice(e) {
    setPrice(e.target.value);
  }
  function handleStock(e) {
    setStock(e.target.value);
  }
  function onClose() {
    setIsOpen(false);
  }
  function onCloseUpdate() {
    setIsOpenUpdate(false);
  }

  function handleFile(e) {
    let file = e.target.files[0];
    
    setFile(file);
    // setImgSrc("products/" + e.target.file[0].name);
  }

  function handleSubmit(e) {
    let formData = new FormData();
    formData.append('image', getFile);
    formData.append('name', getName);
    formData.append('price', getPrice);
    formData.append('stock', getStock);
    e.preventDefault();

    fetch("https://enigmatic-temple-40493.herokuapp.com/products/new", {
      method: "POST",
      
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        
        fetch("https://enigmatic-temple-40493.herokuapp.com/products/")
          .then((res) => res.json())
          .then((json) => {
            setProducts(json.data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  function handleSubmitUpdate(e) {
    let formData = new FormData();
    formData.append('image', getFile);
    formData.append('name', getName);
    formData.append('price', getPrice);
    formData.append('stock', getStock);
    let id = getId;
    e.preventDefault();

    fetch("https://enigmatic-temple-40493.herokuapp.com/products/update/"+id, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        fetch("https://enigmatic-temple-40493.herokuapp.com/products/")
          .then((res) => res.json())
          .then((json) => {
            setProducts(json.data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }




  function handleDelete(id) {
    // http://localhost:8000
    // https://enigmatic-temple-40493.herokuapp.com
    fetch("https://enigmatic-temple-40493.herokuapp.com/products/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${getToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })
      .then((json) => {
        fetch("https://enigmatic-temple-40493.herokuapp.com/products/")
          .then((res) => res.json())
          .then((json) => {
            setProducts(json.data);
          });
      })
      .catch((error) => console.log(error));
  }
}
