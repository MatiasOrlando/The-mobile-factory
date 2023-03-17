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
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const AdmCategories = () => {
  const dispatch = useDispatch();

  const categoriesRedux = useSelector((state) => state.categories);
  const user = useSelector((state) => state.user);

  const [categoryToDelete, setCatToDelete] = useState([]);
  const [categoryCreation, setCatCreation] = useState(false);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
      editable: true,
    },
    {
      field: "description",
      headerName: "Descripción",
      description: "Descripción de la categoría",
      sortable: false,
      width: 900,
      editable: true,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await axios.get(
          `http://localhost:3001/admin/category/getCategorys?id=${user.id}`
        );
        dispatch(loginCategories(categories.data));
      } catch (error) {
        console.error(error);
      }
    }
    if (!categoriesRedux.length && user.id) {
      fetchData();
    }
  }, [user]);

  const cellEdit = async (updated, old) => {
    try {
      const updatedCategory = await axios.put(
        `http://localhost:3001/admin/category/edit`,
        {
          id: user.id,
          previousName: old.name,
          newName: updated.name,
          newDescription: updated.description,
        }
      );
      dispatch(updateCategories(updatedCategory.data));
      return updated;
    } catch (error) {
      console.error(error);
    }
  };

  const checkInput = (arrId) => {
    setCatToDelete(arrId);
  };

  const handleProcessRowError = (error) => {
    return console.error(error);
  };

  const handleDelete = async () => {
    const catObj = categoryToDelete.map((id) => {
      const obj = categoriesRedux.find((e) => e.id === id);
      return obj;
    });
    try {
      catObj.forEach(async (obj) => {
        await axios.delete(
          `http://localhost:3001/admin/category/delete?id=${user.id}&name=${obj.name}`
        );
      });
      dispatch(removeCategories(categoryToDelete));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateBtn = () => {
    setCatCreation(!categoryCreation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategory = await axios.post(
        `http://localhost:3001/admin/category/add`,
        { id: user.id, name: newName, description: newDescription }
      );
      dispatch(addCategories(newCategory.data));
      setNewName("");
      setNewDescription("");
      setCatCreation(false);
    } catch (error) {
      console.error(error);
    }
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
