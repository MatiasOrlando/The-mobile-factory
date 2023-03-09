import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function CardItem({ device, onClose }) {
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={device.images[0]}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {device.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {device.info}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Color: {device.color}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {device.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onClose}>
          Cerrar
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardItem;