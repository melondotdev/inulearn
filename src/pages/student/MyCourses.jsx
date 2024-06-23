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
import { db } from '../../firebase';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import Header from './components/Header';
import { studentOptions } from './lib/studentOptions';
import CourseCard from './components/CourseCard';

const defaultTheme = createTheme();

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [discoverableCourses, setDiscoverableCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, 'courses');
        const enrolledCoursesQuery = query(coursesCollection, where('students', 'array-contains', user.uid));
        const allCoursesSnapshot = await getDocs(coursesCollection);
        const enrolledCoursesSnapshot = await getDocs(enrolledCoursesQuery);

        const enrolledCoursesData = enrolledCoursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const allCoursesData = allCoursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const discoverableCoursesData = allCoursesData.filter(course => 
          !enrolledCoursesData.find(enrolledCourse => enrolledCourse.id === course.id)
        );

        setEnrolledCourses(enrolledCoursesData);
        setDiscoverableCourses(discoverableCoursesData);
      } catch (err) {
        setError('Failed to fetch courses. Please check your permissions and try again.');
      }
    };

    fetchCourses();
  }, [user.uid]);

  const handleEnroll = async (courseId) => {
    try {
      const courseDocRef = doc(db, 'courses', courseId);
      await updateDoc(courseDocRef, {
        students: arrayUnion(user.uid)
      });
      
      setEnrolledCourses(prevState => [
        ...prevState,
        discoverableCourses.find(course => course.id === courseId)
      ]);

      setDiscoverableCourses(prevState => prevState.filter(course => course.id !== courseId));
    } catch (err) {
      console.error("Failed to enroll in course:", err);
      setError("Failed to enroll in course. Please try again later.");
    }
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
                    {error ? (
                      <Typography color="error">{error}</Typography>
                    ) : (
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
                    )}
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
                    {error ? (
                      <Typography color="error">{error}</Typography>
                    ) : (
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
                    )}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MyCourses;
