import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import "./Content.css"
import {Card}   from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

 function Grilla() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function fetchDevices() {
         const response = await fetch("http://localhost:3001/products", 
      );
      const data = await response.json();
      console.log(data);
      setDevices(data);
      }
    fetchDevices();
  }, []);
  //console.log(devices.data);
if (devices.data === undefined ) {
  return <div>
    not data
  </div>
}else {

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        //maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={6}>
        {devices.data.map((device) => (
          <Grid item xs={6} sm={3} md={3} lg={3} xl={3} key={device.api_id}>
            <Card sx={{ margin: '0 0 18px 0', minWidth: 310, minHeight: 310,  height: 200, display: 'flex', justifyContent: 'space-between',flexWrap: 'wrap'}} >
              <Grid container >
                <Grid item >
                  <ButtonBase sx={{ width: '100%', height: 125 }}>
                    <Img alt={device.name} src={device.images ? device.images[0]:""} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={12} xl={2}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item >
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {device.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {device.info}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: {device.api_id}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ cursor: 'pointer' }} variant="body2">
                        Añadir al carrito
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item >
                  <Typography variant="subtitle1" component="div">
                    {device.prices + "$"}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )}}
export default Grilla