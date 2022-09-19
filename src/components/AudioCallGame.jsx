import React, { useState, useEffect } from 'react';
import {
  Avatar, IconButton, Grid, Button, Box,
} from '@mui/material';
import { baseUrl } from '../utils/axios';

export default function AudioCallGame({ wordsPool, onEnd }) {
  const [words] = useState(wordsPool);
  const [selectedWord, setSelectedWord] = useState(null);
  const [result] = useState([]);

  const handleChoose = (e) => {
    if (!selectedWord) {
      if (e.target.value === words[0].id) {
        setSelectedWord({ ...words[0], right: true });
      } else {
        setSelectedWord({ id: e.target.value, right: false });
      }
    }
  };

  const showAnswers = () => {
    setSelectedWord({});
  };

  const defineButtonColor = (id) => {
    if (selectedWord) {
      if (id === words[0].id) {
        return 'success';
      }
      if (selectedWord.id === id) {
        return 'error';
      }
    }
    return 'secondary';
  };

  const handleKeyPress = (e) => {
    if (!selectedWord && Array.from(words[0].variants.keys()).includes(parseInt(e.key, 10) - 1)) {
      const variant = words[0].variants[parseInt(e.key, 10) - 1];
      handleChoose({ target: { value: variant.id } });
      document.removeEventListener('keypress', handleKeyPress);
    }

    if (!selectedWord && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
      showAnswers();
      document.removeEventListener('keypress', handleKeyPress);
    }
    if (selectedWord && e.code === 'Space') {
      showNextWord();
      document.removeEventListener('keypress', handleKeyPress);
    }
  };

  const audio = new Audio(`${baseUrl}/${words[0].audio}`);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    audio.play();
  }, [selectedWord]);

  const showNextWord = () => {
    result.push({
      right: selectedWord.right,
      translate: words[0].wordTranslate,
      ...words[0],
    });
    words.shift();
    if (words.length === 0) {
      onEnd(result);
    } else {
      setSelectedWord(null);
    }
  };

  return (
    <Box
      height="70%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onKeyPress={() => console.log('aaaaa')}
      mt={8}
    >
      <Grid>
        {!selectedWord
          && (
          <div style={{ height: 260 }}>
            <IconButton onClick={() => audio.play()} sx={{ width: 200, height: 200 }}>
              <Avatar src="./assets/images/icon-sound.png" sx={{ width: 100, height: 100 }} />
            </IconButton>
          </div>
          )}
        {selectedWord && (
          <div style={{ height: 260 }}>
            <img src={`${baseUrl}/${words[0].image}`} alt={words[0].word} sx={{ height: 100 }} />
            <div>
              <IconButton onClick={() => audio.play()}>
                <Avatar src="./assets/images/icon-sound.png" />
              </IconButton>
              {words[0].word}
            </div>
          </div>
        )}
        <Grid container justifyContent="center" spacing={4} mt={6} mb={5}>
          {words[0].variants.map((v, i) => (
            <Grid item key={v.id}>
              <Button variant="outlined" value={v.id} color={defineButtonColor(v.id)} onClick={handleChoose}>
                {`${i + 1}  ${v.word}`}
              </Button>
            </Grid>
          ))}
        </Grid>
        {selectedWord && (
          <Button onClick={showNextWord}>
            Далее (Space)
          </Button>
        )}
        {!selectedWord && (
          <Button onClick={showAnswers}>
            Не знаю (Enter)
          </Button>
        )}
      </Grid>

    </Box>
  );
}
