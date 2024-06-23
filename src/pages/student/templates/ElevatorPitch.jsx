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
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
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

const ElevatorPitch = () => {
  const title = 'Elevator Pitch';

  const instructions = `
    <p style="margin-bottom: 0.5rem;">1. Use the drop down menu below to select <span style="font-weight: bold;">ONE</span> of three formulas that you can use to craft an elevator pitch.</p>
    <p style="margin-bottom: 0.5rem;">2. Write your elevator pitch in the space provided below and make sure to <span style="font-weight: bold;">save your work</span>.</p>
  `;
  
  const tableContent = [
    {
      tableName: '[OPTION 1] Present / Past / Future',
      rows: [
        ["Present", "Past", "Future"],
        [
          "- Mention your current job title and employer\n- Provide 1 relevant accomplishment OR relevant soft skill OR high level overview of the role",
          "- Mention relevant education experience AND/OR 1-3 relevant work experiences\n- Provide 1 relevant accomplishment per education or work experience",
          "- Align your personal goals/values with the company's values OR align your skills with the company's needs\n- Explain how this role helps you grow your skills to benefit both you and the company"
        ],
        [
          "I am an analytical thinker with a passion for working with data and a creative flair in simplifying and presenting data to stakeholders. Currently, I'm enrolled in the Jr. Data Analyst Program at NPower Canada where I have developed my technical, project management, and collaboration skills.",
          "I also have a Bachelor of Commerce degree in Marketing, and was previously the Social Media Manager for my university's Marketing Students Association. In this role, I supported our organization with growing our recruitment numbers from 10 to 100 members in one semester by tracking social media metrics through Google Analytics, and positioning posts to highlight our target demographic.",
          "I am very excited for this opportunity as I am looking to combine all the skills I've gained and apply them into a role within a reputable digital marketing agency like your organization."
        ]
      ]
    },
    {
      tableName: '[OPTION 2] Persona / Problem-Action-Result / Value',
      rows: [
        ["Persona", "Problem-Action-Result", "Value"],
        [
          "- Provide a branding statement that readily and clearly communicates who you are",
          "- Give 2-3 accomplishment statements in the 'problem-action-result' formula that are relevant to the job role",
          "- Explain how you can help the employer"
        ],
        [
          "I am a Data Analyst with a passion for helping businesses grow by gathering, analyzing, and presenting data and statistics that help drive important business decisions.",
          "In my previous role, I gathered data on customer purchases and presented the results to upper management, which resulted in the creation of a new campaign that drove 30% more sales revenue into the company.",
          "These experiences make me an excellent candidate to serve your business as I combine my passion for working with data and my previous experience analyzing consumer behaviour to drive sales."
        ]
      ]
    },
    {
      tableName: '[OPTION 3] Persona / Qualifications / Purpose',
      rows: [
        ["Persona", "Problem-Action-Result", "Value"],
        [
          "- Provide a branding statement that readily and clearly communicates who you are",
          "- Give 2-3 accomplishment statements in the 'problem-action-result' formula that are relevant to the job role",
          "- Explain how you can help the employer"
        ],
        [
          "I am a Data Analyst with a passion for helping businesses grow by gathering, analyzing, and presenting data and statistics that help drive important business decisions.",
          "In my previous role, I gathered data on customer purchases and presented the results to upper management, which resulted in the creation of a new campaign that drove 30% more sales revenue into the company.",
          "These experiences make me an excellent candidate to serve your business as I combine my passion for working with data and my previous experience analyzing consumer behaviour to drive sales."
        ]
      ]
    }
  ];

  const { user } = useContext(AuthContext);
  const [elevatorPitch, setElevatorPitch] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const loadElevatorPitch = async () => {
        const docRef = doc(db, 'elevatorpitch', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setElevatorPitch(docSnap.data().elevatorPitch || '');
        }
      };
      loadElevatorPitch();
    }
  }, [user]);

  const handleElevatorPitchChange = (e) => {
    setElevatorPitch(e.target.value);
  };
  
  const handleSave = async () => {
    if (user) {
      const docRef = doc(db, 'elevatorpitch', user.uid);
      await setDoc(docRef, { elevatorPitch: elevatorPitch }, { merge: true });
      setOpen(true); // Show the alert
    }
  };

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    const table = tableContent.find((table) => table.tableName === option);
    setSelectedTable(table);
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
                    <MenuItem value="" disabled>Select a Formula</MenuItem>
                    {tableContent.map((table) => (
                      <MenuItem key={table.tableName} value={table.tableName}>
                        {table.tableName}
                      </MenuItem>
                    ))}
                  </Select>
                </Paper>
              </Grid>
              {selectedTable && (
                <Grid item xs={12} sx={{ flexGrow: 1 }}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {selectedTable.rows[0].map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedTable.rows.slice(1).map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <TableCell 
                                key={cellIndex} 
                                component="th" 
                                scope="row" 
                                sx={{ 
                                  verticalAlign: 'top', 
                                  fontStyle: rowIndex === 1 ? 'italic' : 'normal' 
                                }}
                              >
                                {cell.split('\n').map((line, lineIndex) => (
                                  <Typography key={lineIndex} component="div">{line}</Typography>
                                ))}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
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
                    label="Write your elevator pitch here"
                    variant="outlined"
                    value={elevatorPitch}
                    onChange={handleElevatorPitchChange}
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
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Your elevator pitch has been saved!
              </Alert>
            </Snackbar>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ElevatorPitch;
