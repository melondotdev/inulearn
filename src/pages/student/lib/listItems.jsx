import * as React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DescriptionIcon from '@mui/icons-material/Description';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BiotechIcon from '@mui/icons-material/Biotech';
import MapIcon from '@mui/icons-material/Map';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component="a" href='/dashboard'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component="a" href='/checklist'>
      <ListItemIcon>
        <ChecklistIcon />
      </ListItemIcon>
      <ListItemText primary="Job App Checklist" />
    </ListItemButton>
    <ListItemButton component="a" href='/resume'>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primary="Resume" />
    </ListItemButton>
    <ListItemButton component="a" href='/pitch'>
      <ListItemIcon>
        <WavingHandIcon />
      </ListItemIcon>
      <ListItemText primary="Elevator Pitch" />
    </ListItemButton>
    <ListItemButton component="a" href='/stars'>
      <ListItemIcon>
        <AutoAwesomeIcon />
      </ListItemIcon>
      <ListItemText primary="STARS Stories" />
    </ListItemButton>
    <ListItemButton component="a" href='/research'>
      <ListItemIcon>
        <BiotechIcon />
      </ListItemIcon>
      <ListItemText primary="Job Research" />
    </ListItemButton>
    <ListItemButton component="a" href='/roadmap'>
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="IT Roadmap" />
    </ListItemButton>
  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Weekly Quizzes
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Week 1 Quiz" />
//     </ListItemButton>
//   </React.Fragment>
// );