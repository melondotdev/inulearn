import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../../auth/AuthProvider";
import { updateProfile } from "firebase/auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { studentOptions } from '../lib/studentOptions';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';

import Header from '../components/Header';
import Copyright from '../../../components/Copyright';

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const title = 'Profile';
  
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (user) {
      const loadProfile = async () => {
        setName(user.displayName || '');
        setEmail(user.email || '')
      }

      loadProfile();
    };
  }, [user]);
  
  const handleSave = async () => {
    if (user) {
      updateProfile(user, {
        displayName: `${name}`,
      });
      setOpen(true); // Show the alert
    }
  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header title={title} list={studentOptions} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={3} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 4 }}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    value={email}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    onClick={handleSave}
                    sx={{ mt: 2 }}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </Paper>
              </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Your profile has been updated!
              </Alert>
            </Snackbar>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
