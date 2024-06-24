import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel, TextField, Snackbar, Alert, CircularProgress, Backdrop } from '@mui/material';

const CourseCard = ({ course, enrolled, onEnroll, loading }) => {
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [enrollmentToken, setEnrollmentToken] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    setDialogOpen(true);
  };

  const handleConfirmEnroll = async () => {
    const success = await onEnroll(course.id, enrollmentToken);
    if (!success) {
      setSnackbarMessage('Failed to enroll in course. Please check the token and try again.');
      setSnackbarOpen(true);
    }
    setDialogOpen(false);
    setTermsAccepted(false);
    setEnrollmentToken('');
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTermsAccepted(false);
    setEnrollmentToken('');
  };

  const handleGoToCourse = () => {
    navigate(`/${course.id}/dashboard`);
  };

  const handleTitleClick = () => {
    if (enrolled) {
      navigate(`/${course.id}/dashboard`);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Paper sx={{ p: 2, display: 'flex', alignItems: 'start', width: '100%' }}>
        <img
          src={course.logo}
          alt={course.title}
          style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '16px' }}
        />
        <Box sx={{ flexGrow: 1, marginX: "8px" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', color: 'blue', cursor: 'pointer' }}
            onClick={handleTitleClick}
          >
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: expanded ? 'none' : 3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              paddingRight: '16px'
            }}
          >
            {course.description}
          </Typography>
          <Button size="small" sx={{ marginTop: "16px" }} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        </Box>
        {enrolled ? (
          <Button
            size="small"
            color="primary"
            onClick={handleGoToCourse}
            sx={{ alignSelf: 'center' }}
            disabled={loading}
          >
            Go to Course
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={handleEnrollClick}
            sx={{ alignSelf: 'center' }}
            disabled={loading}
          >
            Enroll
          </Button>
        )}
      </Paper>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Enrollment</DialogTitle>
        <DialogContent>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Typography variant="body1">
            Please confirm that you agree to the terms and conditions and provide the enrollment token to enroll in this course.
          </Typography>
          <TextField
            label="Enrollment Token"
            fullWidth
            value={enrollmentToken}
            onChange={(e) => setEnrollmentToken(e.target.value)}
            margin="normal"
            disabled={loading}
          />
          <FormControlLabel
            control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
            label="I agree to the terms and conditions"
            disabled={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleConfirmEnroll} color="primary" disabled={!termsAccepted || !enrollmentToken || loading}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  enrolled: PropTypes.bool.isRequired,
  onEnroll: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CourseCard;
