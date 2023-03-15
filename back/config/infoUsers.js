const mappedUsers = (array) => {
  const dataUsers = array.map((user) => {
    newObj = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      billing_address: user.billing_address,
      default_shipping_address: user.default_shipping_address,
      country: user.country,
      phone: user.phone,
      admin: user.admin,
      owner: user.owner,
    };
    return newObj;
  });

  return dataUsers;
};

module.exports = mappedUsers;
