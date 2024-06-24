import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../auth/AuthProvider";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Header from './components/Header';
import { db } from '../../firebase';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { studentOptions } from './lib/studentOptions';
import CourseCard from './components/CourseCard';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const defaultTheme = createTheme();
const serverUrl = process.env.REACT_APP_SERVER_URL; 

const MyCourses = () => {
  const { user, updateRole } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [discoverableCourses, setDiscoverableCourses] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, 'courses');
        const allCoursesSnapshot = await getDocs(coursesCollection);
  
        const enrolledCoursesData = [];
        const discoverableCoursesData = [];
  
        for (const courseDoc of allCoursesSnapshot.docs) {
          const course = { id: courseDoc.id, ...courseDoc.data() };
          const studentDocRef = doc(db, 'courses', courseDoc.id, 'students', user.uid);
          const studentDoc = await getDoc(studentDocRef);
  
          if (studentDoc.exists() && studentDoc.data().enrollmentStatus) {
            enrolledCoursesData.push(course);
          } else {
            discoverableCoursesData.push(course);
          }
        }
  
        setEnrolledCourses(enrolledCoursesData);
        setDiscoverableCourses(discoverableCoursesData);
      } catch (err) {
        console.log('Failed to fetch courses. Please check your permissions and try again.', err);
      }
    };
  
    fetchCourses();
  }, [user.uid]);

  const handleEnroll = async (courseId, token) => {
    try {
      const response = await axios.post(`${serverUrl}/enroll`, {
        courseId,
        token,
        uid: user.uid
      });

      if (response.status === 200) {
        // Update Firestore to set enrollment status inside the course document
        const studentDocRef = doc(db, 'courses', courseId, 'students', user.uid);
        await setDoc(studentDocRef, {
          enrollmentStatus: true
        }, { merge: true });

        // Update the course document to include the student
        const courseDocRef = doc(db, 'courses', courseId);
        await updateDoc(courseDocRef, {
          students: arrayUnion(user.uid)
        });

        setEnrolledCourses(prevState => [
          ...prevState,
          discoverableCourses.find(course => course.id === courseId)
        ]);

        setDiscoverableCourses(prevState => prevState.filter(course => course.id !== courseId));
        
        await updateRole();
        
        setSnackbarMessage('Successfully enrolled in the course!');
        setSnackbarSeverity('success');
        return true;
      } else {
        setSnackbarMessage('Failed to enroll in course. Please check the token and try again.');
        setSnackbarOpen(true);
        console.error('Failed to enroll in course:', response.data);
        return false;
      }
    } catch (err) {
      console.error("Failed to enroll in course:", err.response ? err.response.data : err.message);
      setSnackbarMessage("Failed to enroll in course. Please ensure that you are using the correct token.");
      setSnackbarOpen(true);
      return false;
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const title = `My Courses`;

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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography component="h2" variant="h6" color="#FC8149" gutterBottom>
                    Welcome, {user.displayName} 👋 
                  </Typography>
                  <Typography component="h3" variant="h6" color="textSecondary" gutterBottom>
                    Your Enrolled Courses
                  </Typography>
                  <Grid container>
                    {
                      enrolledCourses.length > 0 ? (
                        enrolledCourses.map(course => (
                          <CourseCard
                            key={course.id}
                            course={course}
                            enrolled={true}
                            onEnroll={handleEnroll}
                          />
                        ))
                      ) : (
                        <Typography>No enrolled courses</Typography>
                      )
                    }
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography component="h2" variant="h6" color="#FC8149" gutterBottom>
                    Discover New Courses
                  </Typography>
                  <Grid container>
                    {
                      discoverableCourses.length > 0 ? (
                        discoverableCourses.map(course => (
                          <CourseCard
                            key={course.id}
                            course={course}
                            enrolled={false}
                            onEnroll={handleEnroll}
                          />
                        ))
                      ) : (
                        <Typography>No new courses available</Typography>
                      )
                    }
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default MyCourses;
