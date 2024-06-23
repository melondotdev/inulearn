import React, { useContext } from 'react';
import { AuthContext } from "../../../auth/AuthProvider";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { mainListItems } from '../lib/courseContent';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Header from '../components/Header';
import Instructions from '../components/Instructions';
import Copyright from '../../../components/Copyright';
import Checklist from '../components/Checklist';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const JobAppChecklist = () => {
  const title = 'Job Application Checklist';
  
  const instructions = `
    <p style="margin-bottom: 0.5rem;">Use this checklist to help you prepare for your job search and keep your job search active.</p>
    <p style="margin-bottom: 0.5rem;">1. Complete 'Job Search Building Blocks' and 'Before Starting Your Job Search'</p>
    <p style="margin-bottom: 0.5rem;">2. Use 'Daily' and 'Weekly to Bi-Weekly' to remind yourself of key tasks in your job search.</p>
  `;
  
  const checklistConfig1 = { 
    title: 'Job Search Building Blocks', 
    content: [
      'Ensure that your email display name matches your name on your resume',
      'Create an email signature with your contact information and socials (i.e. LinkedIn)',
      'Enable phone alerts for voicemail and email',
      'Optimize your LinkedIn profile',
      'Join the Npower Canada LinkedIn Group and turn on notifications'
    ]};

  const checklistConfig2 = { 
    title: 'Before Starting Your Job Search', 
    content: [
      'Craft Elevator Pitch',
      'Create STARS Stories',
      'Research Target Employers',
      'Conduct Employer Research',
      'Sign up for job alerts with employers from your target list',
      'Fill out the NPower resume template for IT job roles'
    ]};

  const checklistConfig3 = { 
    title: 'Daily', 
    content: [
      'Review job boards',
      'Apply for jobs with a tailored resume and cover letter',
      'Update your job tracker',
      'Follow companies on LinkedIn and social media',
      'Check your email for NPower Canada updates'
    ]};
  
  const checklistConfig4 = { 
    title: 'Weekly - Bi-weekly', 
    content: [
      'Search for in-person or virtual events (i.e. information interview, event, hiring fair)',
      'Attend an in-person or virtual event',
      'Book a job search session with your Career Specialist / Alumni Placement Specialist'
    ]};
  
  const { user } = useContext(AuthContext);
  
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
            <Grid container spacing={3}>
              <Instructions instructions={instructions} />
              <Checklist config={checklistConfig1} userId={user.uid} />
              <Checklist config={checklistConfig2} userId={user.uid} />
              <Checklist config={checklistConfig3} userId={user.uid} />
              <Checklist config={checklistConfig4} userId={user.uid} />
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default JobAppChecklist;
