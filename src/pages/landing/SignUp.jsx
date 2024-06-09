import React, { useContext } from 'react';
import { AuthContext } from "../../auth/AuthProvider";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo1.png';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../components/Copyright';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp = () => {
  const { createUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // If the user is already authenticated, redirect to the home page
  if (user) {
    navigate("/dashboard");
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');

    createUser(email, password)
      .then((result) => {
        // Update user profile with display name
        updateProfile(result.user, {
          displayName: `${firstName} ${lastName}`,
        });
        navigate("/dashboard");
        console.log(result);
        e.target.reset();
      })
      .catch((error) => {
        let errorMessage = error.message; // Get the error message from Firebase
      
        // Check if the error message contains certain keywords or phrases
        if (errorMessage.includes("auth/invalid-email")) {
          errorMessage = "Please enter a valid email.";
        } else if (errorMessage.includes("auth/missing-password")) {
          errorMessage = "Please enter a password.";
        } else if (errorMessage.includes("auth/weak-password")) {
          errorMessage = "The password must be at least 6 characters long.";
        } else if (errorMessage.includes("email-already-in-use")) {
          errorMessage = "This email is already in use.";
        } else {
          errorMessage = "An error occurred. Please try again later.";
        }
        
        console.error("Error signing up:", errorMessage);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={Logo} alt='logo' className='w-32 h-32 rounded-full mb-2'></img>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;