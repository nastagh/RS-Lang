import { Button } from '@mui/material';
import React from 'react';
import { BASE_URL } from '../../constants/url';
import UserApi from '../../services/UserApi';

function ButtonsActions({
  urlArr, userId, id, toggleState, groups, difficulty,
}) {
  const arr = [...urlArr];
  const allAudio = arr.map((fileMp3) => new Audio(BASE_URL + fileMp3));

  const Play = (audio) => new Promise((resolve) => {
    audio.play();
    audio.addEventListener('ended', () => resolve());
  });

  const autoPlay = async () => {
    for (let i = 0; i < allAudio.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await Play(allAudio[i]);
    }
  };
  const createStateWord = async (stateWord) => {
    await UserApi.createStateWordUser(userId, id, stateWord)
      .catch((error) => console.error(error));
    toggleState();
  };

  const changeStateWord = async (stateWord) => {
    await UserApi.changeStateWordUser(userId, id, stateWord)
      .catch((error) => console.error(error));
    toggleState();
  };

  const styleHardBtn = () => {
    switch (difficulty) {
      case 'hard':
        return ({ color: 'white', backgroundColor: 'red', border: '1px solid red' });
      case 'easy':
        return ({ color: 'grey', border: '1px solid red' });
      default:
        return ({ color: 'red', border: '1px solid red' });
    }
  };
  const styleEasyBtn = () => {
    switch (difficulty) {
      case 'hard':
        return ({ color: 'grey', border: '1px solid green' });
      case 'easy':
        return ({ border: 'green', color: 'white', backgroundColor: 'green' });
      default:
        return ({ color: 'green', border: '1px solid green' });
    }
  };
  if (userId) {
    if (groups === 7) {
      return (
        <>
          <Button onClick={autoPlay}>Play</Button>
          <Button
            onClick={() => (changeStateWord('easy'))}
            style={{ border: '1px solid red', color: 'red' }}
          >
            удалить
          </Button>
          <Button
            disabled
            onClick={() => (changeStateWord('easy'))}
            style={{ color: 'grey', border: '1px solid green' }}
          >
            изучено
          </Button>
        </>
      );
    }

    return (
      <>
        <Button onClick={autoPlay}>слушать</Button>
        <Button
          onClick={() => (createStateWord('hard'))}
          disabled={difficulty === 'easy'}
          style={styleHardBtn()}
        >
          {(difficulty !== 'easy' && difficulty !== 'hard' ? 'сложное' : 'добавлено')}
        </Button>
        <Button
          disabled={difficulty === 'hard' || difficulty === 'easy'}
          onClick={() => (createStateWord('easy'))}
          style={styleEasyBtn()}
        >
          изучено
        </Button>
      </>
    );
  }
  return (
    <>
      <Button onClick={autoPlay}>слушать</Button>
      <Button disabled={!userId}>сложное</Button>
      <Button disabled={!userId}>изучено</Button>
    </>
  );
}

export default ButtonsActions;
