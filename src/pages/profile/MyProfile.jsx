import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../../service/storageService";
import normalizeData from "./normalizeData";
import { inputsValueObject } from "./inputsValueObject";
import ROUTES from "../../routes/ROUTES";
import { Button, Container, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
  const [inputsValue, setInputsValue] = useState(inputsValueObject);
  const navigate = useNavigate();
  useEffect(() => {
    let token = getToken();
    let id = jwtDecode(token)._id;
    axios
      .get("/users/" + id)
      .then(({ data }) => {
        const newData = normalizeData(data);
        setInputsValue(newData);
      })
      .catch((err) => {
        toast.info("Error from server, can't get your profile", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);
  const handleEdit = () => {
    navigate(ROUTES.EDITPROFILE);
  };
  return (
    <Container sx={{ mt: 12 }}>
      <Avatar
        alt={inputsValue.alt}
        src={inputsValue.url}
        sx={{ width: 70, height: 70 }}
      />{" "}
      <Box sx={{ mt: 2, ml: 1 }}>
        <Divider textAlign="left">Personal Information</Divider>{" "}
        <Typography variant="h5" sx={{ mt: 2 }}>
          First Name: {inputsValue.first}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Middle Name: {inputsValue.middle}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Last Name: {inputsValue.last}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Phone: {inputsValue.phone}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          Email: {inputsValue.email}
        </Typography>
        <Divider textAlign="left">Address</Divider>{" "}
        <Typography variant="h5" sx={{ mt: 2 }}>
          State: {inputsValue.state}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Country: {inputsValue.country}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Address:{" "}
          {`${inputsValue.city}, ${inputsValue.street} ${inputsValue.houseNumber}`}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Zip: {inputsValue.zip}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          onClick={handleEdit}
          fullWidth
        >
          EDIT PROFILE
        </Button>
      </Box>
    </Container>
  );
};

export default MyProfile;
