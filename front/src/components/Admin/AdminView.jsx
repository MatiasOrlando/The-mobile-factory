import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAllCust,
  removeAllCust,
  updateAllCust,
} from "../../state/allCustomers";
import axios from "axios";

function AdminView() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const allCustomers = useSelector((state) => state.allCustomers);

  useEffect(() => {
    async function fetchData() {
      try {
        const customers = await axios.get(
          `http://localhost:3001/admin/users/getUsers?id=${user.id}`
        );
        dispatch(loginAllCust(customers.data));
      } catch (error) {
        console.error(error);
      }
    }
    if (!allCustomers.length && user.id) {
      fetchData();
    }
  }, [user, allCustomers]);

  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "full_name", headerName: "Nombre", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "admin", headerName: "Admin", width: 120 },
    {
      field: "select",
      headerName: "Check",
      width: 70,
      renderCell: (params) => (
        <Checkbox
          checked={selectedUser === params.row.id}
          onChange={() => setSelectedUser(params.row.id)}
          defaultChecked
          color="primary"
          inputProps={{ "aria-label": "checkbox with default color" }}
        />
      ),
    },
  ];
  const handlePromote = async () => {
    const usr = allCustomers.find((item) => item.id === selectedUser);
    if (usr.owner) {
      return;
    }
    try {
      const updatedUser = await axios.put(
        "http://localhost:3001/admin/users/add",
        { id: user.id, email: usr.email, old: usr.admin }
      );
      dispatch(updateAllCust(updatedUser.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const usr = allCustomers.find((item) => item.id === selectedUser);
    if (usr.owner) {
      return;
    }
    try {
      const deletedUser = await axios.delete(
        `http://localhost:3001/admin/users/deleteUser?id=${user.id}&email=${usr.email}`
      );
      dispatch(removeAllCust(deletedUser.data[0]));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          fontFamily: "monospace",
          fontSize: "120%",
          fontWeight: "900",
          marginBottom: "2.5%",
        }}
      >
        Administracion
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={allCustomers} columns={columns} pageSize={5} />
      </div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginRight: "2%" }}
          onClick={handlePromote}
        >
          Promover/Revocar
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          ELIMINAR
        </Button>
      </div>
    </div>
  );
}
export default AdminView;
