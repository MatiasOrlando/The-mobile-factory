import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ShoppingHistory() {
  const [history, setHistory] = useState([]);
  const [histProds, setHistProds] = useState([]);
  //const user = useSelector((state) => state.user);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchDevices() {
      const response = await fetch(
        `http://localhost:3001/checkout/ordersOneUser/${user.id}`
      );
      const data = await response.json();

      let arr = [];
      let miData = data.map((el) => el.products);
      miData.forEach((el) => {
        el.forEach((e) => arr.push(JSON.parse(e)));
      });
      setHistProds(arr);
      setHistory(data);
    }
    fetchDevices();
  }, []);

  /* let miArr = JSON.parse(history[0].products);
  let miMap = miArr.map(prod=>JSON.parse(prod))
  console.log(miMap); */

  const purchases = [
    { date: "2022-03-10", articulo: "Shoes", quantity: 1, precio: 50 },
    { date: "2022-03-11", articulo: "T-shirt", quantity: 2, precio: 20 },
    { date: "2022-03-12", articulo: "Jeans", quantity: 10, precio: 80 },
  ];
  return (
    <div style={{ marginTop: "70px" }}>
      {
        <TableRow
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, width: "75%" }}
            colSpan={6}
          >
            <Box sx={{ margin: 1 }}>
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
                Historial de compras/ventas
              </Typography>
              <Table size="small" aria-label="purchases" sx={{}}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Articulo</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Precio
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Catidad
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Precio Total ($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {histProds.map((purchase, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {new Date(purchase.updatedAt).toLocaleDateString(
                          "es-AR",
                          { year: "2-digit", month: "2-digit", day: "2-digit" }
                        ) +
                          " " +
                          new Date(
                            "2023-03-16T16:18:10.462Z"
                          ).toLocaleTimeString("es-AR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }) +
                          " hs"}
                      </TableCell>
                      <TableCell>{purchase.productId}</TableCell>
                      <TableCell align="right">{purchase.price}</TableCell>
                      <TableCell align="right">{purchase.quantity}</TableCell>
                      <TableCell align="right">
                        {(
                          parseFloat(purchase.price) * purchase.quantity
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableCell>
        </TableRow>
      }
    </div>
  );
}
export default ShoppingHistory;
