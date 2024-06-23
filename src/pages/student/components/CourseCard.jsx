import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';

const CourseCard = ({ course, enrolled, onEnroll }) => {
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  
  const handleEnrollClick = () => {
    setDialogOpen(true);
  };

  const handleConfirmEnroll = () => {
    onEnroll(course.id);
    setDialogOpen(false);
    setTermsAccepted(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTermsAccepted(false);
  };

  const handleGoToCourse = () => {
    navigate(`/${course.id}/dashboard`);
  };

  const handleTitleClick = () => {
    if (enrolled) {
      navigate(`/${course.id}/dashboard`);
    }
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
          >
            Go to Course
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={handleEnrollClick}
            sx={{ alignSelf: 'center' }}
          >
            Enroll
          </Button>
        )}
      </Paper>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Enrollment</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please confirm that you agree to the terms and conditions to enroll in this course.
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
            label="I agree to the terms and conditions"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmEnroll} color="primary" disabled={!termsAccepted}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  enrolled: PropTypes.bool.isRequired,
  onEnroll: PropTypes.func.isRequired,
};

export default CourseCard;
