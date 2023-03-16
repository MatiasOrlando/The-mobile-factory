import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Radio, Button, Typography, Checkbox} from '@mui/material';

function AdminView() {
  const [users, setUsers] = useState([
    { id: 1, name: "John", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane", email: "jane@example.com", role: "user" },
    { id: 3, name: "Bob", email: "bob@example.com", role: "user" },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Rol', width: 120 },
    {
      field: 'select',
      headerName: 'Check',
      width: 70,
      renderCell: (params) => (
        <Checkbox
          checked={selectedUser === params.row.id }
          onChange={() => setSelectedUser(params.row.id)}
         /*color="primary"
          value="select"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'Select' }}*/
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
      ),
    },
  ];
  const handlePromote = () => {
    
    setUsers(users.map(user => {
      if (user.id === selectedUser) {
        console.log("SET USER:",selectedUser);
    console.log("USER:",user.id);
        return { ...user, role: 'admin' };
      } else {
        return user;
      }
    }));
  };
  
  const handleRevoke = () => {
    setUsers(users.map(user => {
      if (user.id === selectedUser) {
        return { ...user, role: 'user' };
      } else {
        return user;
      }
    }));
  };
  
  return (
    <div style={{marginTop:"5%"}}>
        <Typography variant="h6" gutterBottom component="div" sx={{ fontFamily:"monospace", fontSize:"120%", fontWeight:"900", marginBottom:"2.5%"}}>
                Administracion
              </Typography>
      <div style={{ height: 400, width: '100%'}}>
        <DataGrid rows={users} columns={columns} pageSize={5} />
      </div>
      <div>
        <Button variant="outlined" color="primary" sx={{marginRight:"2%"}} onClick={handlePromote}>Promover</Button>
        <Button variant="outlined" color="primary" onClick={handleRevoke}>Revocar</Button>
      </div>
    </div>
  );
}
export default AdminView