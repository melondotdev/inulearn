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
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to="/npc-jita/dashboard">
      <ListItemButton >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/npc-jita/checklist">
      <ListItemButton>
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
        <ListItemText primary="Job Checklist" />
      </ListItemButton>
    </Link>
    <Link to="/npc-jita/resume">
      <ListItemButton>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Resume" />
      </ListItemButton>
    </Link>
    <Link to="/npc-jita/pitch">
      <ListItemButton>
        <ListItemIcon>
          <WavingHandIcon />
        </ListItemIcon>
        <ListItemText primary="Elevator Pitch" />
      </ListItemButton>
    </Link>
    <Link to="/npc-jita/stars">
      <ListItemButton>
        <ListItemIcon>
          <AutoAwesomeIcon />
        </ListItemIcon>
        <ListItemText primary="STARS Stories" />
      </ListItemButton>
    </Link>
    <Link to="/npc-jita/research">
      <ListItemButton>
        <ListItemIcon>
          <BiotechIcon />
        </ListItemIcon>
        <ListItemText primary="Job Research" />
      </ListItemButton>
    </Link>
    <Link to="/npc-jita/roadmap">
      <ListItemButton>
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary="IT Roadmap" />
      </ListItemButton>
    </Link>
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