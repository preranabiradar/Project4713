import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

function MyForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    if (newName.trim() === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(newName);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const phoneRegex = /^\d{10}$/;
    if (phoneRegex.test(inputValue)) {
      setPhoneNumberError(false);
    } else {
      setPhoneNumberError(true);
    }
    setPhoneNumber(inputValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValidEmail) {
      setError(true);
    } else {
      setError(false);
    }
    setEmail(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (name.trim() === "") {
        setNameError(true);
      } else {
        setNameError(false);
      }

      if (!isValidEmail) {
        setError(true);
      } else {
        setError(false);
      }

      if (phoneRegex.test(phoneNumber)) {
        setPhoneNumberError(false);
      } else {
        setPhoneNumberError(true);
      }
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("email", email);
    navigate("/about");
  };

  return (
    <Container maxWidth="sm">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{
            display: "block",
            marginTop: "8px",
            marginBottom: "8px",
          }}
          fullWidth
          label="Name"
          value={name}
          onChange={handleNameChange}
          error={nameError}
          helperText={nameError ? "Name cannot be empty" : ""}
        />

        <TextField
          fullWidth
          sx={{ display: "block", marginTop: "8px", marginBottom: "8px" }}
          className={classes.phoneNumber}
          label="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          error={phoneNumberError}
          helperText={phoneNumberError ? "Invalid phone number" : ""}
        />

        <TextField
          fullWidth
          sx={{ display: "block", marginTop: "8px", marginBottom: "8px" }}
          className={classes.email}
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          error={error}
          helperText={error ? "Please enter a valid email address" : ""}
        />

        <Button fullWidth type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default MyForm;
