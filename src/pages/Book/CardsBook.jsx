import { Grid } from '@mui/material';
import React from 'react';
import CardBook from './CardBook';

export default function CardsBook({
  words, user, toggleState, groups, userId,
}) {
  return (
    words.map((word) => {
      // eslint-disable-next-line no-underscore-dangle
      const wordWithId = { ...word, id: (word.id || word._id) };

      return (
        <Grid item xs={12} sm={6} md={3} key={wordWithId.id}>
          <CardBook
            groups={groups}
            userId={userId}
            toggleState={toggleState}
            user={user}
            {...wordWithId}
          />
        </Grid>
      );
    })
  );
}
