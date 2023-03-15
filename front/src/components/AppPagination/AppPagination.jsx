import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";

const AppPagination = ({ setPage, setPagination}) => {
  const handleChange = (page) => {
    setPage(parseInt(page) + 49);
    window.scrollTo(0, 0);
    setPagination(false)
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        onChange={(e) => {
          handleChange(e.target.textContent);
        }}
        count={5}
      />
    </div>
  );
};

export default AppPagination;
