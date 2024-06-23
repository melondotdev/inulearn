import * as React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Link } from 'react-router-dom';

export const studentOptions = (
  <React.Fragment>
    <Link to="/booking">
      <ListItemButton>
        <ListItemIcon>
          <EditCalendarIcon />
        </ListItemIcon>
        <ListItemText primary="Book an Advisor" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);