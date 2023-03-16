import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import {
  addAllP,
  loginAllP,
  removeAllP,
  updateAllP,
} from "../../state/allProducts";

const AdmProducts = () => {
  const dispatch = useDispatch();
  const allProductsRedux = useSelector((state) => state.allProducts);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchData() {
      try {
        const products = await axios.get(
          `http://localhost:3001/admin/products/allProducts?id=${user.id}`
        );
        products.data.forEach((item) => {
          let brand = JSON.stringify(item.brand);
          if (brand !== "null") {
            let vuelta = JSON.parse(brand);
            item.brand = vuelta.name;
          }
        });
        dispatch(loginAllP(products.data));
      } catch (error) {
        console.error(error);
      }
    }
    if (!allProductsRedux.length && user.id) {
      fetchData();
    }
  }, [user]);

  const [productToDelete, setProdToDelete] = useState([]);
  const [productCreation, setProdCreation] = useState(false);
  const newProductModel = {
    name: "",
    price: "",
    color: "",
    display_size: "",
    info: "",
    year: 0,
    storage: "",
    amountCores: "",
    stock: 0,
    brand: "",
    images: "",
  };

  const [newProduct, setNewProduct] = useState(newProductModel);

  const cellEdit = async (updated, old) => {
    console.log(allProductsRedux[0]);
    try {
      const updatedProduct = await axios.put(
        `http://localhost:3001/admin/products/edit-product?idUser=${user.id}&idProduct=${updated.id}`,
        { updated }
      );
      dispatch(updateAllP(updated));
      return updated;
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "name",
      headerName: "Nombre",
      width: 150,
      editable: true,
    },
    {
      field: "info",
      headerName: "Información",
      description: "Descripción del producto",
      sortable: false,
      width: 280,
      editable: true,
    },
    {
      field: "price",
      headerName: "Precio",
      width: 100,
      editable: true,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 70,
      editable: true,
      type: "number",
    },
    {
      field: "brand",
      headerName: "Categoria",
      width: 150,
      editable: true,
    },
    {
      field: "display_size",
      headerName: "Pantalla",
      width: 80,
      editable: true,
    },
    {
      field: "storage",
      headerName: "Almacenamiento",
      width: 120,
      editable: true,
    },
    {
      field: "amountCores",
      headerName: "Núcleos",
      width: 70,
      editable: true,
    },
    {
      field: "color",
      headerName: "Color",
      width: 70,
      editable: true,
    },
    {
      field: "year",
      headerName: "Año",
      width: 90,
      editable: true,
      type: "number",
    },
  ];

  const checkInput = (arrId) => {
    setProdToDelete(arrId);
  };

  const handleProcessRowError = (error) => {
    return console.error(error);
  };

  const handleDelete = () => {
    const prodObj = productToDelete.map((id) => {
      const obj = allProductsRedux.find((e) => e.id === id);
      return obj;
    });
    try {
      prodObj.forEach(async (obj) => {
        await axios.delete(
          `http://localhost:3001/admin/products/delete-product?id=${user.id}&idProduct=${obj.id}`
        );
      });
      dispatch(removeAllP(productToDelete));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateBtn = () => {
    setProdCreation(!productCreation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProductBack = await axios.post(
        `http://localhost:3001/admin/products/add-product?idUser=${user.id}`,
        { newProduct }
      );
      dispatch(addAllP(newProductBack.data[0]));
      setNewProduct(newProductModel);
      setProdCreation(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreationState = (e) => {
    if (e.target.id === "year" || e.target.id === "stock") {
      const parse = parseInt(e.target.value);
      setNewProduct({ ...newProduct, [e.target.id]: parse });
      return;
    }
    if (e.target.id === "images") {
      setNewProduct({ ...newProduct, [e.target.id]: [e.target.value] });
      return;
    }
    setNewProduct({ ...newProduct, [e.target.id]: e.target.value });
  };

  return (
    <div style={{ marginTop: "100px", height: 450, width: "100%" }}>
      <Typography variant="h3" align="center">
        PRODUCTOS
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "30px",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={handleCreateBtn}
        >
          CREAR NUEVO PRODUCTO
        </Button>
      </div>
      <div style={{ textAlign: "center" }}>
        {productCreation ? (
          <Box
            component="form"
            autoComplete="off"
            margin={2}
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="name"
              label="Nombre"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="price"
              label="Precio"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="stock"
              label="Stock"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
              type={"number"}
            />
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="category"
              label="Categoria"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="size"
              label="Tamaño"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="storage"
              label="Almacenamiento"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="amountCores"
              label="Núcleos"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="year"
              label="Año"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
              type={"number"}
            />
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="display_size"
              label="Tamaño pantalla"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <TextField
              sx={{ margin: "10px", width: "20%" }}
              required
              id="color"
              label="Color"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <TextField
              sx={{ margin: "10px", width: "42%" }}
              required
              id="images"
              label="URL de imágen"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <TextField
              sx={{ margin: "10px", width: "74%" }}
              required
              id="info"
              label="Descripción"
              variant="outlined"
              onChange={(e) => handleCreationState(e)}
              size="small"
            />
            <Button
              variant="contained"
              type="submit"
              color="success"
              endIcon={<SendIcon />}
              sx={{ margin: "9px" }}
            >
              AGREGAR
            </Button>
          </Box>
        ) : (
          false
        )}
      </div>
      <DataGrid
        rows={allProductsRedux}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onRowSelectionModelChange={(arrId) => checkInput(arrId)}
        processRowUpdate={(updated, old) => cellEdit(updated, old)}
        onProcessRowUpdateError={(error) => handleProcessRowError(error)}
      />
      {productToDelete.length ? (
        <Button
          variant="contained"
          type="submit"
          color="error"
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
          sx={{ margin: "20px", width: "40%" }}
        >
          ELIMINAR
        </Button>
      ) : (
        false
      )}
    </div>
  );
};

export default AdmProducts;
