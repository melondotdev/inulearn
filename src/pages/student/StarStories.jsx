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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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

const StarsStories = () => {
  const title = 'STARS Stories Inventory';
  
  const instructions = `
    <p style="margin-bottom: 0.5rem;">1. Use the drop down menu below to select one of the behavioral or technical questions.</p>
    <p style="margin-bottom: 0.5rem;">2. Write your STARS story in the space provided below and make sure to save your work.</p>
  `;

  const questions = [
    'Behavioral 1 - Tell me about a time when you had a conflict with a coworker or supervisor. What did you do to resolve the situation?',
    'Behavioral 2 - Tell me about a time you had many tasks to complete in a day. How did you organize and manage your time?',
    'Behavioral 3 - Tell me about a time when you had to work as part of a team?',
    'Behavioral 4 - How do you handle stress at work? Provide a specific example.',
    'Behavioral 5 - Tell me about a time when a customer or client reported an issue that you did not know the answer to. What did you do?',
    'Behavioral 6 - Have you ever worked with a difficult manager or customer? And how were you able to do so?',
    'Behavioral 7 - Tell me about a time when you had to simplify complex or technical information to a customer, colleague or manager. What did you do?',
    'Behavioral 8 - Tell me about a time when you made a mistake. How did you handle it?',
    'Behavioral 9 - Describe your most complex project from start to finish. What were the most difficult challenges and how did you handle them?',
    'Tech 1 - Describe a time when you helped a non-technical person to troubleshoot a technical issue.',
    'Tech 2 - Describe a time when you had to adapt to a new technology quickly.',
    'Tech 3 - Share an example of a time when you had to collaborate with others to resolve a technical issue.',
  ];

  const { user } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState('');
  const [starsStory, setStarsStory] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && selectedOption) {
      const loadStarsStory = async () => {
        const docRef = doc(db, 'stars', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStarsStory(data[selectedOption] || '');
        } else {
          setStarsStory('');
        }
      };
      loadStarsStory();
    }
  }, [user, selectedOption]);

  const handleStarsStoryChange = (e) => {
    setStarsStory(e.target.value);
  };

  const handleSave = async () => {
    if (user && selectedOption) {
      const docRef = doc(db, 'stars', user.uid);
      await setDoc(docRef, { [selectedOption]: starsStory }, { merge: true });
      setOpen(true); // Show the alert
    }
  };

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
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
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Select a Question</MenuItem>
                    {questions.map((question, index) => (
                      <MenuItem key={index} value={question}>
                        {question}
                      </MenuItem>
                    ))}
                  </Select>
                </Paper>
              </Grid>
              {selectedOption && (
                <Grid item xs={12} sx={{ flexGrow: 1 }}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <TextField
                      label="Write your STARS story here"
                      variant="outlined"
                      value={starsStory}
                      onChange={handleStarsStoryChange}
                      fullWidth
                      multiline
                      rows={8}
                      sx={{ 
                        resize: 'vertical',
                        minHeight: 200,
                      }}
                    />
                  </Paper>
                  <Button 
                    onClick={handleSave}
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Save
                  </Button>
                </Grid>
              )}
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Your STARS story has been saved!
              </Alert>
            </Snackbar>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default StarsStories;
