const axios = require("axios");
const Product = require("../models/Product");
const mappedArray = require("../config/dataFetch");
const { Brand } = require("../models");

class ProductsService {
  static async fetchAllProducts(page) {
    try {
      const productsInDb = await Product.findAll();
      const arrayProdsDB = productsInDb
        .map((obj) => obj.dataValues)
        .filter((el) => el.page == parseInt(page));
      if (arrayProdsDB.length && arrayProdsDB.length > 0) {
        return { error: false, newArr: arrayProdsDB };
      } else {
        const res = await axios.get(
          `https://api.device-specs.io/api/smartphones?populate=*&sort=general_year:desc&pagination[page]=${parseInt(
            page
          )}&pagination[pageSize]=12`,
          {
            method: "GET",
            headers: {
              Authorization:
                "bearer 6c07431327b5d39c2c30a1cfd7ad0b295afce5acc8cf7c72b5a933cd6ddb8fd7e1790c633a329b705583479bf4f7fab77e77f02fee14e998e8bb9d79bacc1773a5e5233daea6ec639d9ab60e196641da43ca9b3174d8ce4d9c0e3948a14446afe4a07cdf63f9108681fb1491a5d61939d2283876e9fe588f64e86ffac845cb85",
            },
          }
        );

        const newArr = mappedArray(res.data.data, page);
        return { error: false, newArr };
      }
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async productCreation(arrProducts) {
    arrProducts.map(async (cellphone) => {
      try {
        const [newBrand, isCreated] = await Brand.findOrCreate({
          where: { name: cellphone.name.split(" ")[0].toLowerCase() },
          defaults: { name: cellphone.name.split(" ")[0].toLowerCase() },
        });
        return newBrand.dataValues;
      } catch (error) {
        console.log(error);
      }
    });
    const allBrands = await Brand.findAll();
    const arrayBrands = allBrands.map((obj) => obj.dataValues);
    const arrayDbProducts = arrProducts.map(async (cellphone) => {
      try {
        const [item, created] = await Product.findOrCreate({
          where: { api_id: cellphone.api_id },
          defaults: cellphone,
        });
        arrayBrands.forEach((brand) => {
          if (brand.name == item.name.split(" ")[0].toLowerCase()) {
            item.setBrand(brand.id);
          }
        });
        return item.dataValues;
      } catch (error) {
        return { error: true, data: error };
      }
    });

    const productsDb = await Promise.all(arrayDbProducts);
    return productsDb;
  }
  static async getSingleProduct(id) {
    try {
      const selectedProduct = await Product.findByPk(id);
      return selectedProduct;
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getQueryProducts(searchTerm) {
    try {
      const res = await axios.get(
        `https://api.device-specs.io/api/smartphones?populate=*&filters[name][$containsi]=${searchTerm}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "bearer 6c07431327b5d39c2c30a1cfd7ad0b295afce5acc8cf7c72b5a933cd6ddb8fd7e1790c633a329b705583479bf4f7fab77e77f02fee14e998e8bb9d79bacc1773a5e5233daea6ec639d9ab60e196641da43ca9b3174d8ce4d9c0e3948a14446afe4a07cdf63f9108681fb1491a5d61939d2283876e9fe588f64e86ffac845cb85",
          },
        }
      );
      return { error: false, data: res.data.data };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = ProductsService;
