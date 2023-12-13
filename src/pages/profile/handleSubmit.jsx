import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { validateEditUser } from "../../validation/validateEditUser";
const handleSubmit = async (inputsValue, setErrorsState, navigate, id) => {
  try {
    const joiResponse = validateEditUser(inputsValue);
    setErrorsState(joiResponse);
    if (joiResponse) {
      const { data } = await axios.put("/users/" + id, {
        name: {
          first: inputsValue.first,
          middle: inputsValue.middle,
          last: inputsValue.last,
        },
        phone: inputsValue.phone,
        image: {
          url: inputsValue.url,
          alt: inputsValue.alt,
        },
        address: {
          state: inputsValue.state,
          country: inputsValue.country,
          city: inputsValue.city,
          street: inputsValue.street,
          houseNumber: inputsValue.houseNumber,
          zip: +inputsValue.zip,
        },
      });
      toast.success("Your profile was updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.PROFILE);
    }
  } catch (err) {
    console.log(err);
    toast.error("Request failed... try again", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

export { handleSubmit };
