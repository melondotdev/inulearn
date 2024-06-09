import React, { useState, useEffect } from 'react';
import Title from './Title';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Checklist = ({ config, userId }) => {
  const title = config.title;
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    // Load the saved state from Firebase when the component mounts
    const loadCheckedItems = async () => {
      const docRef = doc(db, 'checklists', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCheckedItems(docSnap.data()[title] || {});
      }
    };

    loadCheckedItems();
  }, [title, userId]);

  const handleCheckboxChange = async (index) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [index]: !checkedItems[index],
    };

    setCheckedItems(updatedCheckedItems);

    // Save the updated state to Firebase
    await setDoc(doc(db, 'checklists', userId), {
      [title]: updatedCheckedItems,
    }, { merge: true });
  };

  return (
    <Grid item xs={12} sx={{ flexGrow: 1 }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Title>{title}</Title>
        <Grid container spacing={2}>
          {config.content.map((line, index) => (
            <React.Fragment key={index}>
              <Grid item xs={10} sx={{ alignSelf: 'flex-start' }}>
                {line}
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!checkedItems[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  }
                  label=""
                  sx={{ marginTop: 0 }}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Checklist;
