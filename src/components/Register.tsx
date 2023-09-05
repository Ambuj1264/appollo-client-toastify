import React, {  useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./style/Register.css"

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const MY_MUTATIONS_DATA = gql`
  mutation CreateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate = useNavigate();

  const [userMutation] = useMutation(MY_MUTATIONS_DATA);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    const { email, password, firstName, lastName } = state;

    if (!(email && password && firstName && lastName)) {
      if (!firstName) {
      return   setFirstNameError("First Name is required");
      }
      if (!lastName) {
        return   setLastNameError("Last Name is required");
      }
      if (!email) {
        return   setEmailError("Email is required");
      }
      if (!password) {
        return      setPasswordError("Password is required");
      }
    } else {
      try {
        const result = await userMutation({
          variables: {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
          },
        });

        if (result.data) {
          displayToast("🦄 Registration successful!", "success");
          navigate("/login");
        } else {
          displayToast(`🦄  Something went wrong!`, "error");
        }
      } catch (error: any) {
        displayToast("🦄 Something went wrong! ", "error");
      }
    }
  };

 
  const displayToast = (message: string, type: "success" | "error") => {
   
  return  toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: type === "success" ? "colored" : "colored",
      type: type,
    });
  };
  

  return (
    <div>
      <h1 className="my-5" style={{ textAlign: "center" }}>
        Register Here
      </h1>
      <Box
        component="form"
        className="my-5"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          name="firstName"
          value={state?.firstName}
          label="First Name"
          variant="outlined"
          onChange={handleInputChange}
          required
        />
        <span className="text-danger myerror">{firstNameError}</span>
        <TextField
          id="outlined-basic"
          name="lastName"
          label="Last Name"
          value={state?.lastName}
          variant="outlined"
          onChange={handleInputChange}
          required
        />
        <span className="text-danger myerror">{lastNameError}</span>
        <TextField
          id="outlined-basic"
          name="email"
          label="Email"
          value={state?.email?.toLowerCase()}
          variant="outlined"
          onChange={handleInputChange}
          required
        />
        <span className="text-danger myerror">{emailError}</span>
        <FormControl sx={{ m: 1, width: "45ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            className="text-danger "
            value={state.password}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
  
        <span  className="text-danger myerror">{passwordError}</span>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="success" onClick={submitData}>
            Register
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
