import React, { useState } from 'react';
import Title from './Title';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const Instructions = ({ instructions }) => {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Grid item xs={12} sx={{ flexGrow: 1 }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid',
          borderColor: '#FC8149',
          position: 'relative',
          '&:hover .toggle-button': {
            opacity: 1,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Title>How to Use this Document</Title>
        </Box>
        <Collapse in={expanded}>
          <Typography
            variant="body1"
            component="div"
            dangerouslySetInnerHTML={{ __html: instructions }}
            sx={{ marginBottom: '2rem' }}
          />
        </Collapse>
        <IconButton
          onClick={handleToggle}
          className="toggle-button"
          sx={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Paper>
    </Grid>
  );
}

export default Instructions;
