export const fetchDataApi = async () => {
    try {
      const data = await fetch("https://api.device-specs.io/api/smartphones?populate=*", {
        method: "GET",
        headers: {
          Authorization:
            "bearer 6c07431327b5d39c2c30a1cfd7ad0b295afce5acc8cf7c72b5a933cd6ddb8fd7e1790c633a329b705583479bf4f7fab77e77f02fee14e998e8bb9d79bacc1773a5e5233daea6ec639d9ab60e196641da43ca9b3174d8ce4d9c0e3948a14446afe4a07cdf63f9108681fb1491a5d61939d2283876e9fe588f64e86ffac845cb85",
        },
      });
      const cellphones = await data.json();
      console.log(cellphones);
    } catch (error) {
      console.log(error);
    }
  };