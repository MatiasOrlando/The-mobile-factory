import React from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function ShoppingHistory() {
  
  const purchases = [
    { date: '2022-03-10', articulo: 'Shoes', quantity: 1, precio: 50 },
    { date: '2022-03-11', articulo: 'T-shirt', quantity: 2, precio: 20 },
    { date: '2022-03-12', articulo: 'Jeans', quantity: 10, precio: 80 },
    ]
  return (
    <div style={{marginTop: '70px'} }>
    <TableRow sx={{ width:"100%", display:"flex", justifyContent: "center"}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 , width:"75%"}} colSpan={6}>
          
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontFamily:"monospace", fontSize:"120%", fontWeight:"900", marginBottom:"2.5%"}}>
                Historial de compras/ventas
              </Typography>
              <Table size="small" aria-label="purchases" sx={{}}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight:"bold"}}>Fecha</TableCell>
                    <TableCell sx={{fontWeight:"bold"}}>Articulo</TableCell>
                    <TableCell align="right" sx={{fontWeight:"bold"}}>Precio</TableCell>
                    <TableCell align="right" sx={{fontWeight:"bold"}}>Catidad</TableCell>
                    <TableCell align="right" sx={{fontWeight:"bold"}}>Precio Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases.map((purchase,i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {purchase.date}
                      </TableCell>
                      <TableCell>{purchase.articulo}</TableCell>
                      <TableCell align="right">{purchase.precio}</TableCell>
                      <TableCell align="right">{purchase.quantity}</TableCell>
                      <TableCell align="right">
                        {purchase.precio * purchase.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
         
        </TableCell>
      </TableRow>
</div>
)
}
export default ShoppingHistory
