import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../auth/AuthProvider";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { db } from '../../firebase'; // Adjust the path as needed
import { doc, getDoc, setDoc } from 'firebase/firestore';

import Header from './components/Header';
import Instructions from './components/Instructions';
import Copyright from '../../components/Copyright';

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Resume = () => {
  const title = 'Resume';

  const instructions = `
    <p style="margin-bottom: 0.5rem;">1. Click <a href="https://docs.google.com/document/d/1f_pTldXV5TiNTCp5JGvXx0-W7AZTLZsA3CI7NeeTWRg/copy" target="_blank" rel="noopener noreferrer" style="color: blue;">this link</a> to open up a copy of the resume template.</p>
    <p style="margin-bottom: 0.5rem;">2. Copy and paste the URL of the copy below, then save it.</p>
    <p style="margin-bottom: 0.5rem;">3. Enable sharing so that anyone with the link can edit. This will enable your career specialist to give you feedback directly on the shared document.</p>
    <p style="margin-bottom: 0.5rem;">4. Make improvements according to the feedback given by your career specialist.</p>
  `;

  const { user, loading } = useContext(AuthContext);
  const [resumeUrl, setResumeUrl] = useState('');
  const [savedUrl, setSavedUrl] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const loadResumeUrl = async () => {
        const docRef = doc(db, 'resumes', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSavedUrl(docSnap.data().url || '');
        }
      };
      loadResumeUrl();
    }
  }, [user]);

  const handleUrlChange = (e) => {
    setResumeUrl(e.target.value);
  };

  const handleSaveUrl = async () => {
    if (user) {
      const docRef = doc(db, 'resumes', user.uid);
      await setDoc(docRef, { url: resumeUrl }, { merge: true });
      setSavedUrl(resumeUrl);
      setResumeUrl('');
      setOpen(true); // Show the alert
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (loading) {
    return <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header title={title} />
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Instructions instructions={instructions} />
              <Grid item xs={12} sx={{ flexGrow: 1 }}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <TextField
                    label="Paste your resume URL here"
                    variant="outlined"
                    value={resumeUrl}
                    onChange={handleUrlChange}
                    fullWidth
                  />
                  <Button 
                    onClick={handleSaveUrl}
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="primary"
                  >
                    Save URL
                  </Button>
                </Paper>
              </Grid>
              {savedUrl && (
                <Grid item xs={12} sx={{ flexGrow: 1 }}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography variant="h6">Saved Resume URL:</Typography>
                    <Typography 
                      variant="body1"
                      sx={{
                        wordBreak: 'break-all', 
                        overflowWrap: 'break-word'
                      }}
                    >
                      <a href={savedUrl} target="_blank" rel="noopener noreferrer">{savedUrl}</a>
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Your resume URL has been saved!
              </Alert>
            </Snackbar>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Resume;
