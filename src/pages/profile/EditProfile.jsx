import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Alert, Container } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { inputsValueObject } from "./inputsValueObject";
import { EditProfileData } from "./EditProfileData";
import { handleSubmit } from "./handleSubmit";
import { getToken } from "../../service/storageService";
import { jwtDecode } from "jwt-decode";
const EditProfile = () => {
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState(inputsValueObject);
  let token = getToken();
  let id = jwtDecode(token)._id;
  useEffect(() => {
    axios
      .get("/users/" + id)
      .then(({ data }) => {
        setInputsValue(EditProfileData(data));
      })
      .catch((err) => {
        toast.info("Error from server, can't get your profile to edit", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(err);
      });
  }, [id]);
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleEditProfile = (e) => {
    e.preventDefault();
    handleSubmit(inputsValue, setErrorsState, navigate, id);
  };
  return (
    <Container>
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit profile{" "}
        </Typography>

        <Grid sx={{ width: "60vw" }}>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ mt: 2 }}
              id="first"
              variant="outlined"
              label="First Name"
              value={inputsValue.first}
              onChange={handleInputsChange}
              required
            />
            {errorsState && errorsState.first && (
              <Alert severity="warning">{errorsState.first}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="middle"
              variant="outlined"
              label="Middle name"
              value={inputsValue.middle}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.middle && (
              <Alert severity="warning">{errorsState.middle}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="last"
              variant="outlined"
              label="Last name"
              value={inputsValue.last}
              onChange={handleInputsChange}
              required
            />
            {errorsState && errorsState.last && (
              <Alert severity="warning">{errorsState.last}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="phone"
              variant="outlined"
              label="Phone"
              value={inputsValue.phone}
              onChange={handleInputsChange}
              required
            />
            {errorsState && errorsState.phone && (
              <Alert severity="warning">{errorsState.phone}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="country"
              variant="outlined"
              label="Country"
              value={inputsValue.country}
              onChange={handleInputsChange}
              required
            />
            {errorsState && errorsState.countery && (
              <Alert severity="warning">{errorsState.countery}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="city"
              variant="outlined"
              label="City"
              value={inputsValue.city}
              onChange={handleInputsChange}
              required
            />
            {errorsState && errorsState.city && (
              <Alert severity="warning">{errorsState.city}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="state"
              variant="outlined"
              label="State"
              value={inputsValue.state}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.state && (
              <Alert severity="warning">{errorsState.state}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="street"
              variant="outlined"
              label="Street"
              value={inputsValue.street}
              onChange={handleInputsChange}
              required
            />
            {errorsState && errorsState.street && (
              <Alert severity="warning">{errorsState.street}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="houseNumber"
              variant="outlined"
              label="House number"
              value={inputsValue.houseNumber}
              onChange={handleInputsChange}
              required
            />
            {errorsState && errorsState.houseNumber && (
              <Alert severity="warning">{errorsState.houseNumber}</Alert>
            )}
            <TextField
              sx={{ mt: 2 }}
              id="zip"
              variant="outlined"
              label="Zip"
              value={inputsValue.zip}
              onChange={handleInputsChange}
            />
            {errorsState && errorsState.zip && (
              <Alert severity="warning">{errorsState.zip}</Alert>
            )}
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleEditProfile}
            fullWidth
          >
            UPDATE
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditProfile;
