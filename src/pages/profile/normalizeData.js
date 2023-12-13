const normalizeData = (dataFromServer) => {
  return {
    first: dataFromServer.name.first,
    middle: dataFromServer.name.middle,
    last: dataFromServer.name.last,
    phone: dataFromServer.phone,
    email: dataFromServer.email,
    url: dataFromServer.image.url,
    alt: "user profile image",
    state: dataFromServer.address.state,
    country: dataFromServer.address.country,
    city: dataFromServer.address.city,
    street: dataFromServer.address.street,
    houseNumber: dataFromServer.address.houseNumber,
    zip: +dataFromServer.address.zip,
  };
};

export default normalizeData;
