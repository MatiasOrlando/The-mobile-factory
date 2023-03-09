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
         const response = await fetch('https://api.device-specs.io/api/smartphones?populate=*', {
        method: "GET",
        headers: {
          Authorization:
            "bearer 6c07431327b5d39c2c30a1cfd7ad0b295afce5acc8cf7c72b5a933cd6ddb8fd7e1790c633a329b705583479bf4f7fab77e77f02fee14e998e8bb9d79bacc1773a5e5233daea6ec639d9ab60e196641da43ca9b3174d8ce4d9c0e3948a14446afe4a07cdf63f9108681fb1491a5d61939d2283876e9fe588f64e86ffac845cb85",
        },
      });
      const data = await response.json();
      setDevices(data);
      }
    fetchDevices();
  }, []);
  console.log(devices.data);
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
          <Grid item xs={6} sm={3} md={3} lg={3} xl={3} key={device.id}>
            <Card sx={{ margin: '0 0 18px 0', minWidth: 310, minHeight: 310,  height: 200, display: 'flex', justifyContent: 'space-between',flexWrap: 'wrap'}} >
              <Grid container >
                <Grid item >
                  <ButtonBase sx={{ width: '100%', height: 125 }}>
                    <Img alt={device.name} src={device.images ? device.images[0].url:""} />
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
                        ID: {device.id}
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
                    {device.prices[0].price + "$"}
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