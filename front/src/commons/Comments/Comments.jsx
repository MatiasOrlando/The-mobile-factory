import { Paper, Grid } from "@mui/material";
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
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <h4>Agregar comentarios</h4>
      <h4>Comentarios</h4>
      {existComments.length
        ? existComments.map((items) => (
            <Paper style={{ padding: "20px 20px", marginTop: 10 }}>
              <Grid>
                <p style={{ textAlign: "left", color: "gray" }}>{items}</p>
              </Grid>
            </Paper>
          ))
        : false}
      <textarea
        value={comment}
        onChange={onChangeHandler}
        className="input-box"
      />
      <button onClick={onClickHandler} className="comment-button">
        Enviar
      </button>
    </div>
  );
};
