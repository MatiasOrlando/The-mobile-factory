import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  loginCategories,
  removeCategories,
  updateCategories,
} from "../../state/categories";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const AdmCategories = () => {
  const dispatch = useDispatch();
  const categoriesRedux = useSelector((state) => state.categories);
  /* para cargar Redux con las categorias primera vez que entramos */
  useEffect(() => {
    async function fetchData() {
      try {
        /* const categories = axios.get("ruta back que trae todas las categorias"); */
        let fakeCategories = [
          { id: 1, name: "Samsung", description: "Soy marca Samsung" },
          { id: 2, name: "Nokia", description: "Soy marca vieja, Nokia" },
          { id: 3, name: "LG", description: "Soy marca de LG" },
        ];
        dispatch(loginCategories(fakeCategories));
      } catch (error) {
        console.error(error);
      }
    }
    if (!categoriesRedux.length) {
      fetchData();
    }
  }, []);

  const [categoryToDelete, setCatToDelete] = useState([]);
  const [categoryCreation, setCatCreation] = useState(false);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  /* const unGetter = (e) => {
    return e.value
  } */

  /* const descriptionSetter = (e) => {
    return { ...e.row, description: e.value };
  };

  const nameSetter = (e) => {
    return { ...e.row, name: e.value };
  }; */

  const cellEdit = (updated, old) => {
    /* ANTES HAY QUE ACTUALIZAR LA DATABASE */
    dispatch(updateCategories(updated));
    return updated;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
      editable: true,
      /* valueSetter: nameSetter, */
    },
    {
      field: "description",
      headerName: "Descripción",
      description: "Descripción de la categoría",
      sortable: false,
      width: 900,
      editable: true,
      /* valueGetter: unGetter,
      valueSetter: descriptionSetter, */
    },
  ];

  const checkInput = (arrId) => {
    setCatToDelete(arrId);
  };

  const handleProcessRowError = (error) => {
    return console.error(error);
  };

  const handleDelete = () => {
    /* ANTES ACTUALIZAR DATABASE */
    dispatch(removeCategories(categoryToDelete));
  };

  const handleCreateBtn = () => {
    setCatCreation(!categoryCreation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* PRIMERO ACTUALIZAMOS LA DATABASE */
    let nuevaFake = { id: 4, name: newName, description: newDescription };
    dispatch(addCategories(nuevaFake));
    setNewName("");
    setNewDescription("");
    setCatCreation(false);
  };

  return (
    <div style={{ marginTop: "100px", height: 400, width: "100%" }}>
      <Typography variant="h3" align="center">
        CATEGORIAS
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
          CREAR NUEVA CATEGORIA
        </Button>
      </div>
      {categoryCreation ? (
        <Box
          component="form"
          autoComplete="off"
          margin={2}
          sx={{ display: "flex", alignItems: "center" }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            sx={{ margin: "10px", width: "20%" }}
            required
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            onChange={(e) => setNewName(e.target.value)}
            size="small"
          />
          <TextField
            sx={{ margin: "10px", width: "60%" }}
            required
            id="outlined-basic"
            label="Descripción"
            variant="outlined"
            onChange={(e) => setNewDescription(e.target.value)}
            size="small"
          />
          <Button
            variant="contained"
            type="submit"
            color="success"
            endIcon={<SendIcon />}
          >
            AGREGAR
          </Button>
        </Box>
      ) : (
        false
      )}
      <DataGrid
        rows={categoriesRedux}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onRowSelectionModelChange={(arrId) => checkInput(arrId)}
        processRowUpdate={(updated, old) => cellEdit(updated, old)}
        onProcessRowUpdateError={(error) => handleProcessRowError(error)}
      />
      {categoryToDelete.length ? (
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

export default AdmCategories;
