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
  const [histProds, setHistProds] = useState([]);

  const [data, setData] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(
        `http://localhost:3001/checkout/ordersOneUser/${user.id}`
      );
      const data = await response.json();

      let arr = [];
      setData(data);
      let miData = data.map((el) => {
        return { prods: el.products, id: el.id };
      });

      miData.forEach((el) => {
        el.prods.forEach((e) => arr.push({ prod: JSON.parse(e), id: el.id }));
      });
      setHistProds(arr);
    }

    async function fetchAdmin() {
      const response = await fetch(
        `http://localhost:3001/checkout/ordersUser/${user.id}`
      );
      const data = await response.json();

      let arr = [];
      setData(data);
      let miData = data.map((el) => {
        return { prods: el.products, id: el.id, mail: el.order_email };
      });

      miData.forEach((el) => {
        el.prods.forEach((e) =>
          arr.push({ prod: JSON.parse(e), id: el.id, mail: el.mail })
        );
      });
      setHistProds(arr);
    }

    if (user.admin || user.owner) {
      fetchAdmin();
    } else if (user.id) {
      fetchUser();
    }
  }, [user]);

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
                      Nro de Orden
                    </TableCell>
                    {user.owner || user.admin ? (
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        Users
                      </TableCell>
                    ) : (
                      false
                    )}
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Subtotales ($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {histProds.map((purchase, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {new Date(purchase.prod.updatedAt).toLocaleDateString(
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
                      <TableCell>{purchase.prod.name}</TableCell>
                      <TableCell align="right">{purchase.prod.price}</TableCell>
                      <TableCell align="right">
                        {purchase.prod.quantity}
                      </TableCell>
                      <TableCell align="right">N{purchase.id}</TableCell>
                      {user.owner || user.admin ? (
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        Users
                      </TableCell>
                    ) : (
                      false
                    )}
                      <TableCell align="right">
                        {(
                          parseFloat(purchase.prod.price) *
                          purchase.prod.quantity
                        ).toFixed(2)}
                        €
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
