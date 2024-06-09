import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../assets/logo1.png';

const defaultTheme = createTheme();

const ResetPw = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
        setError('');
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
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
          <img src={Logo} alt='logo' className='w-32 h-32 rounded-full mb-2' />
          {emailSent ? (
            <>
              <Typography component="h1" variant="h5">
                Email Sent!
              </Typography>
              <Typography variant="body2">
                An email with instructions to reset your password has been sent to {email}.
              </Typography>
              <Link component={RouterLink} to="/login" variant="body2">
                Return to login
              </Link>
            </>
          ) : (
            <Box component="form" onSubmit={sendEmail} noValidate sx={{ mt: 1, textAlign: "center" }}>
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Forgot Password?
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ fontStyle: "italic" }}>
                Enter your email and we'll send you a link to reset your password
              </Typography>
              {error && <Typography color="error">{error}</Typography>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send reset link
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    {"Remembered your password? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default ResetPw;
