import { Paper, Grid, Button, TextField, Typography, Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../state/comments";

export const Comments = ({ id }) => {
  const comentariosRedux = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const [existComments, setExistComments] = useState([]);

  useEffect(() => {
    const filterRedux = comentariosRedux.filter((item) => item.id == id);
    if (filterRedux.length) setExistComments(filterRedux[0].commentaries);
  }, [comentariosRedux]);

  const onClickHandler = () => {
    dispatch(addComment({ id, commentaries: [comment] }));
    setComment("");
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          marginTop: "20%",
        }}
      >
        <Typography variant="h6" style={{ marginTop: "10%", padding: "1px" }}>
          Comentarios
        </Typography>

        {existComments.length
          ? existComments.map((items) => (
              <Paper
                style={{
                  marginTop: "2%",
                }}
              >
                <Grid>
                  <Typography
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      color: "gray",
                    }}
                  >
                    {items}
                  </Typography>
                </Grid>
              </Paper>
            ))
          : false}
        <TextField
          style={{ display: "flex", marginTop: "5%" }}
          value={comment}
          onChange={onChangeHandler}
          placeholder="Añadir comentario"
          multiline
          variant="filled"
          rows={3}
        />

        <Button style={{ display: "flex" }} onClick={onClickHandler}>
          Enviar
        </Button>
      </Box>
    </div>
  );
};
