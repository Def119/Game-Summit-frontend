import React, { useState, useEffect } from "react";
import "../../App.css";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";

function ContactUs() {
  const theme = useTheme();

  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(() => {
    const data = localStorage.getItem("formData");
    return data ? JSON.parse(data) : initialFormData;
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (obj) => {
    const { name, value } = obj.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (obj) => {
    obj.preventDefault();

    // Required Field Check
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please Fill in All Required Fields.");
      return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      alert("Invalid Email Address");
      return;
    }

    // Clear form after submission
    setFormData(initialFormData);
    console.log(localStorage.getItem("formData"));
    alert(
      "Hi " +
        JSON.parse(localStorage.getItem("formData")).name +
        ", Your Message Has Been Sent Successfully"
    );
  };

  return (
    <div
      className="contact"
      style={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
    >
      <Container maxWidth="md" style={{ marginTop: "5rem" }}>
        <center>
          <Typography variant="h2" gutterBottom>
            Contact Us
          </Typography>
        </center>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          mb={4}
        >
          <Box mt={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: "2rem" }}>
              Contact Information
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <Phone style={{ marginRight: "0.5rem" }} />
              <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                +94 712 345 789
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Email style={{ marginRight: "0.5rem" }} />
              <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                info@gamesummit.com
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOn style={{ marginRight: "0.5rem" }} />
              <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                16/1, Uyana road, Moratuwa, Sri Lanka
              </Typography>
            </Box>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: theme.palette.mode === "dark" ? "#fff" : "#000" },
            }}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: theme.palette.mode === "dark" ? "#fff" : "#000" },
            }}
          />
          <TextField
            label="Message"
            name="message"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: theme.palette.mode === "dark" ? "#fff" : "#000" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color={theme.palette.mode === "dark" ? "secondary" : "primary"}
            style={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default ContactUs;
