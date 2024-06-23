import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../../auth/AuthProvider";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { mainListItems } from '../lib/courseContent';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { db } from '../../../firebase'; // Adjust the path as needed
import { doc, getDoc, setDoc } from 'firebase/firestore';

import Header from '../components/Header';
import Instructions from '../components/Instructions';
import Copyright from '../../../components/Copyright';

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Research = () => {
  const title = 'Job Research';

  const instructions = `
    <p style="margin-bottom: 0.5rem;">It is a standard expectation amongst employers that a candidate researches their company when preparing your resume or attending an interview.</p>
    <p style="margin-bottom: 0.5rem;">The questions below are designed to help direct your review of a company and provide you with a place to record findings and any questions or interesting facts you find.</p>
    <p style="margin-bottom: 0.5rem; font-weight: bold;">This process will help you to develop great questions that you can ask at the end of an interview.</p>
    <p style="margin-bottom: 0.5rem;">Make sure to save your work using the button at the bottom of the page!</p>
  `;
  
  const questions = [
    "Date",
    "Company Name",
    "Position Applying For",
    "Where are their offices? Do they operate remotely, in-person, or both?",
    "Who are their clients/customers?",
    "Where are their clients/customers located?",
    "Are they non-profit or for-profit?",
    "What are the services or products they provide?",
    "What are they recognized or known for?",
    "Do they have any awards?",
    "What industry certifications do they have?",
    "Is the company/org a member of any associations?",
    "How diverse is the workforce, is it a mix of people? What is the company dress code?",
    "Are they members of any industry associations?",
    "Do they have a podcast or blog? Read or listen to at least one.",
    "What other job openings do they have that you would be interested in for the future?",
    "Question to ask the interviewer #1",
    "Question to ask the interviewer #2",
    "Question to ask the interviewer #3"
  ];
  
  const { user } = useContext(AuthContext);
  const [responses, setResponses] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const loadResponses = async () => {
        const docRef = doc(db, 'research', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setResponses(docSnap.data());
        }
      };
      loadResponses();
    }
  }, [user]);

  const handleResponseChange = (question) => (event) => {
    setResponses({ ...responses, [question]: event.target.value });
  };

  const handleSave = async () => {
    if (user) {
      const docRef = doc(db, 'research', user.uid);
      await setDoc(docRef, responses, { merge: true });
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
        <Header title={title} list={mainListItems} />
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
              <Instructions instructions={instructions} />
              <Grid item xs={12} sx={{ flexGrow: 1 }}>
                <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ width: '50%' }}>
                          <TextField
                            value={responses["Date"] || ''}
                            label="Date"
                            onChange={handleResponseChange("Date")}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell sx={{ width: '50%' }}>
                          <TextField
                            value={responses["Company Name"] || ''}
                            label="Company Name"
                            onChange={handleResponseChange("Company Name")}
                            fullWidth
                          />
                        </TableCell>
                      </TableRow>
                      {questions.slice(2).map((question, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ width: '100%' }} colSpan={3}>
                            <TextField
                              value={responses[question] || ''}
                              onChange={handleResponseChange(question)}
                              fullWidth
                              multiline
                              rows={4}
                              label={question}
                              sx={{ 
                                resize: 'vertical',
                                minHeight: 100,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button 
                  onClick={handleSave}
                  sx={{ mt: 2 }}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Your responses have been saved!
              </Alert>
            </Snackbar>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Research;
