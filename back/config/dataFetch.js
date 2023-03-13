const mappedArray = (array) => {
  const test = array.map((cellphone) => {
    const newObj = {
      api_id: cellphone.id,
      name: cellphone.name,
      price: cellphone.prices[0].price
        ? cellphone.prices[0].price + "€"
        : "500€",
      color: cellphone.main.design_color_name || "Space gray",
      display_size: cellphone.main.display_size__inch + "''" || "5.5''",
      info: cellphone.info || "",
      images: cellphone.images ? cellphone.images.map((el) => el.url) : "",
      year:
        cellphone.main.general_year ||
        Math.floor(Math.random() * (2015 - 2022 + 1) + 2023),
      storage: cellphone.main.storage_capacity__gb + "gb" || "64gb",
      amountCores: cellphone.main.cpu_number_of_cores || "4",
      stock: Math.floor(Math.random() * 10),
    };
    return newObj;
  });
  return test;
};

module.exports = mappedArray;
