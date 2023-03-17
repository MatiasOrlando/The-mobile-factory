import * as React from "react";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../state/reviews";

export const RatingProduct = ({ id }) => {
  const dispatch = useDispatch();
  const reviewsRedux = useSelector((state) => state.reviews);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const filterRedux = reviewsRedux.filter((item) => item.id == id);
    if (filterRedux.length) setValue(1);
  }, [reviewsRedux]);

  const handleChange = (e) => {
    dispatch(addReview({ id, review: e.target.value }));
    setValue(1);
  };
  function handleReview() {
    const obj = reviewsRedux.find((item) => item.id == id);
    if (obj) {
      return parseInt(obj.review);
    }
    return 0;
  }

  return (
    <div>
      <Rating
        name="simple-controlled"
        value={value == 0 ? 5 : handleReview()}
        onChange={handleChange}
      />
    </div>
  );
};
