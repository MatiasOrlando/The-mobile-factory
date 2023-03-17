const axios = require("axios");
const { Customer } = require("../models");

class UsersService {
  static async userRegister(body) {
    const emailGod = "owner@mail.com";
    try {
      if (body.email === emailGod) {
        body.owner = true;
        body.admin = true;
        const newUser = await Customer.create(body);
        return newUser;
      } else {
        const newUser = await Customer.create(body);
        return newUser;
      }
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async userLogIn(body) {
    const { email } = body;
    try {
      const userRegistered = await Customer.findOne({
        where: {
          email: email,
        },
      });
      return userRegistered;
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async userUpdate(body, params) {
    const { id } = params;
    try {
      const [extras, updatedUser] = await Customer.update(body, {
        where: { id },
        returning: true,
      });
      const updateUser = updatedUser[0];
      return updateUser;
    } catch (error) {}
    return { error: true, data: error };
  }
}

module.exports = UsersService;
