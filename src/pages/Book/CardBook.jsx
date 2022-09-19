import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardActions } from '@mui/material';
import { BASE_URL } from '../../constants/url';
import ButtonsActions from './ButtonsActions';

export default function CardBook(props) {
  const {
    groups,
    toggleState,
    userWord,
    id,
    wordTranslate,
    word, transcription, image, textMeaning,
    textMeaningTranslate, textExampleTranslate,
    textExample, audio, audioExample, audioMeaning, userId,
  } = props;
  const numberGuessWord = userWord?.optional?.right;
  const numberUseWord = userWord?.optional?.useWord;

  const toggleStyle = () => {
    const difficulty = userWord?.difficulty;
    switch (difficulty) {
      case !difficulty:
        break;
      case 'hard':
        return ({ boxShadow: '-1px 5px 20px 10px rgba(255, 0, 0, 0.2)', color: 'red' });
      case 'easy':
        return ({ boxShadow: '-1px 5px 20px 10px rgba(0, 255, 41, 0.2)', color: 'green' });
      default:
        break;
    }
  };

  return (
    <Card
      id={id}
      sx={[
        {
          height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 4,
        },
        // console.log(toggleStyle()),
        toggleStyle(),
      ]}
    >
      <CardMedia
        component="img"
        image={`${BASE_URL}${image}`}
        alt={word}
      />
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${word} ${transcription}`}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`${wordTranslate}`}
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: textMeaning }} gutterBottom variant="subtitle2" component="div" />
          <Typography gutterBottom variant="subtitle4" component="div">
            {textMeaningTranslate}
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: textExample }} gutterBottom variant="subtitle2" component="div" />
          <Typography gutterBottom variant="subtitle4" component="div">
            {textExampleTranslate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box style={userId ? { visibility: 'visible' } : { visibility: 'hidden' }}>
        <Typography gutterBottom variant="subtitle2" component="div">
          использовано:
          {numberUseWord || 0 }
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="div">
          угадано:
          {numberGuessWord || 0}
        </Typography>

      </Box>

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonsActions
          toggleState={toggleState}
          difficulty={userWord?.difficulty}
          groups={groups}
          id={id}
          userId={userId}
          urlArr={[audio, audioMeaning, audioExample]}
        />
      </CardActions>
    </Card>
  );
}
