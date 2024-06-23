import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../auth/AuthProvider";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import emailjs from '@emailjs/browser';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import Header from './components/Header';
import { studentOptions } from './lib/studentOptions';

const defaultTheme = createTheme();

const Booking = () => {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetingDuration, setMeetingDuration] = useState('');
  const [service, setService] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  const durations = ['30 minutes', '60 minutes', '90 minutes'];
  const services = ['Job search 101', 'Resume review', 'Mock interview', 'Other'];

  useEffect(() => {
    generateAvailableTimes(selectedDate);
  }, [selectedDate]);

  const generateAvailableTimes = (date) => {
    const times = [];
    const start = new Date(date.setHours(13, 0, 0, 0));
    const end = new Date(date.setHours(21, 0, 0, 0));
    
    while (start < end) {
      if (!(start.getHours() === 17 && start.getMinutes() >= 30) && !(start.getHours() === 18 && start.getMinutes() < 30)) {
        const localTime = new Date(start).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        });
        times.push(localTime);
      }
      start.setMinutes(start.getMinutes() + 30);
    }

    setAvailableTimes(times);
  };

  const validateForm = () => {
    const errors = {};
    if (!meetingDuration) errors.meetingDuration = "Meeting duration is required.";
    if (!service) errors.service = "Service is required.";
    if (!termsAccepted) errors.termsAccepted = "You must agree to the terms and conditions.";
    if (!selectedTime) errors.selectedTime = "You must select a time.";
    return errors;
  };

  const handleBookClick = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    setErrors({});
    setIsSubmitting(true);
  
    emailjs.send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      {
        from_name: user.displayName,
        from_email: user.email,
        booking_type: service,
        booking_date: selectedDate.toDateString(),
        booking_time: selectedTime,
        booking_length: meetingDuration,
        details: additionalInfo,
      },
      process.env.REACT_APP_PUBLIC_KEY
    ).then((result) => {
      setConfirmationMessage('Your booking request has been sent. You will receive an invite within 2-3 business days. If there is no advisor available at the time that you selected, your advisor will reach out to book another time with you.');
      setDialogOpen(true);
      setIsSubmitting(false);
    }).catch((error) => {
      console.log(error.text);
      setConfirmationMessage('There was an error sending your booking request. Please try again.');
      setDialogOpen(true);
      setIsSubmitting(false);
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header title="Book an Advisor" list={studentOptions} />
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
                  <Typography component="h2" variant="h6" color="#FC8149" >
                    Book a Meeting with an Advisor
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                    Please select a date and time slot for your booking
                  </Typography>
                  <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
                    <Grid item xs={12} md={6} sx={{ height: '300px' }}>
                      <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        minDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} // Set minDate to 3 days from today
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
                        <FormControl component="fieldset" error={!!errors.selectedTime}>
                        <FormLabel component="legend" sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.3)", marginBottom: "8px", padding: "8px", width: "75%" }}>Available Times*</FormLabel>
                        <FormGroup style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }}>
                            <RadioGroup
                              value={selectedTime}
                              onChange={(e) => setSelectedTime(e.target.value)}
                            >
                              {availableTimes.map((time, index) => (
                                <FormControlLabel key={index} value={time} control={<Radio />} label={time} />
                              ))}
                            </RadioGroup>
                          </FormGroup>
                          {errors.selectedTime && <FormHelperText>{errors.selectedTime}</FormHelperText>}
                        </FormControl>
                      </Paper>
                    </Grid>    
                  </Grid>
                  <Typography variant="body1" sx={{ marginBottom: "16px", fontStyle: "italic" }}>
                    *Note: Selecting a time and date does not guarantee that an advisor will be available. An advisor will reach out by email to confirm the meeting.
                  </Typography>   
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        label="Meeting Duration"
                        value={meetingDuration}
                        onChange={(e) => setMeetingDuration(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.meetingDuration}
                        helperText={errors.meetingDuration}
                      >
                        {durations.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item sx={{ flexGrow: 1 }}>
                      <TextField
                        select
                        label="Topic to Discuss"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.service}
                        helperText={errors.service}
                      >
                        {services.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>  
                  <TextField
                    label="Additional Details for Your Advisor"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
                    label="I agree to the terms and conditions"
                  />
                  {errors.termsAccepted && <Typography color="error">{errors.termsAccepted}</Typography>}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBookClick}
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                  >
                    Book Now
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Booking Confirmation</DialogTitle>
        <DialogContent>
          <Typography>{confirmationMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Booking;
