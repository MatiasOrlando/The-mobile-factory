import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
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
  /* para cargar Redux con todos los productos la primera vez que entramos */
  useEffect(() => {
    async function fetchData() {
      try {
        /* const productos = axios.get("ruta back que trae todos los productos de la DB"); */
        let fakeProducts = [
          {
            id: 1,
            name: "Apple iPhone",
            price: "765.71€",
            color: "Purple",
            display_size: "6.1'",
            info: "2021 - A14 Bionic Chip - 6 cores - 6.1 inch - 64GB - Purple - MJNM3ZD/A marca Samsung",
            year: 2021,
            storage: "64gb",
            amountCores: "6",
            stock: 6,
            brand: "soy la categoria",
            images: [],
          },
          {
            id: 2,
            name: "Samsung A88",
            price: "550.00€",
            color: "Purple",
            display_size: "6.1'",
            info: "2021 - A14 Bionic Chip - 6 cores - 6.1 inch - 64GB - Purple - MJNM3ZD/A marca Samsung",
            year: 2021,
            storage: "64gb",
            amountCores: "8",
            stock: 6,
            brand: "soy la categoria",
            images: [],
          },
          {
            id: 3,
            name: "Nokia 1100",
            price: "1.16€",
            color: "Purple",
            display_size: "6.1'",
            info: "2021 - A14 Bionic Chip - 6 cores - 6.1 inch - 64GB - Purple - MJNM3ZD/A marca Samsung",
            year: 2021,
            storage: "64gb",
            amountCores: "3",
            stock: 6,
            brand: "soy la categoria",
            images: [],
          },
        ];
        dispatch(loginAllP(fakeProducts));
      } catch (error) {
        console.error(error);
      }
    }
    if (!allProductsRedux.length) {
      fetchData();
    }
  }, []);

  const [productToDelete, setProdToDelete] = useState([]);
  const [productCreation, setProdCreation] = useState(false);
  const newProductModel = {
    id: 4,
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

  const cellEdit = (updated, old) => {
    /* ANTES HAY QUE ACTUALIZAR LA DATABASE */
    dispatch(updateAllP(updated));
    return updated;
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
      headerName: "Size",
      width: 50,
      editable: true,
    },
    {
      field: "storage",
      headerName: "Storage",
      width: 80,
      editable: true,
    },
    {
      field: "amountCores",
      headerName: "Cores",
      width: 50,
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
    /* ANTES ACTUALIZAR DATABASE */
    dispatch(removeAllP(productToDelete));
  };

  const handleCreateBtn = () => {
    setProdCreation(!productCreation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* PRIMERO ACTUALIZAMOS LA DATABASE */
    /* Atento que no obtengo exactamente toda la info, falta: id, api_id, page */
    /* la categoría, paso un string */
    dispatch(addAllP(newProduct));
    setNewProduct(newProductModel);
    setProdCreation(false);
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
    <div style={{ marginTop: "100px", height: 400, width: "100%" }}>
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
            // sx={{ display: "flex", alignItems: "center" }}
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
              id="brand"
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
