import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../../auth/AuthProvider";
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { mainListItems } from '../lib/courseContent';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Header from '../components/Header';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const defaultTheme = createTheme();

const Dashboard = () => {
  const title = 'NPC JITA Dashboard';

  const { user } = useContext(AuthContext);
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const fetchProgressData = async () => {
      if (user) {
        try {
          const checklistDoc = await getDoc(doc(db, 'checklists', user.uid));
          const resumeDoc = await getDoc(doc(db, 'resumes', user.uid));
          const elevatorPitchDoc = await getDoc(doc(db, 'elevatorpitch', user.uid));
          const starStoriesDoc = await getDoc(doc(db, 'stars', user.uid));
          const researchDoc = await getDoc(doc(db, 'research', user.uid));
          
          // Calculate the number of true values in the checklist
          const checklistData = checklistDoc.exists() ? checklistDoc.data() : {};
          const checklistCount = Object.values(checklistData).reduce((count, section) => {
            return count + Object.values(section).filter(value => value === true).length;
          }, 0);

          const progress = {
            checklist: checklistCount,
            resume: resumeDoc.exists() && resumeDoc.data().url ? 1 : 0,
            elevatorPitch: elevatorPitchDoc.exists() && elevatorPitchDoc.data().elevatorPitch ? 1 : 0,
            starStories: starStoriesDoc.exists() ? Object.keys(starStoriesDoc.data()).filter(key => starStoriesDoc.data()[key]).length : 0,
            research: researchDoc.exists() ? Object.keys(researchDoc.data()).filter(key => researchDoc.data()[key]).length : 0,
          };
          
          setProgressData(progress);
        } catch (error) {
          console.error('Error fetching progress data:', error);
        }
      }
    };

    fetchProgressData();
  }, [user]);

  const data = {
    labels: [
      'Job App Checklist',
      'Resume Uploaded',
      'Elevator Pitch',
      'Star Stories',
      'Research',
    ],
    datasets: [
      {
        data: [
          (progressData.checklist / 19) * 100,
          progressData.resume * 100,
          progressData.elevatorPitch * 100,
          (progressData.starStories / 5) * 100,
          (progressData.research / 19) * 100,
        ],
        label: '% Completion',
        backgroundColor: 'rgba(254, 148, 0, 0.2)',
        borderColor: 'rgba(254, 148, 0, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header title={title} list={mainListItems}/>
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography component="h2" variant="h6" color="#FC8149" gutterBottom>
                    Capstone Progress
                  </Typography>
                  <Bar data={data} options={options} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
