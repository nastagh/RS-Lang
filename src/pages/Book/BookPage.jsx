import {
  Container, Grid, Pagination, Stack, ThemeProvider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardsBook from './CardsBook';
import useAuth from '../../hooks/useAuth';
import UserApi from '../../services/UserApi';
import noUserApi from '../../services/noUserApi';
import ButtonsNavGroups from './ButtonsNavGroups';
import { mainTheme } from '../../utils/theme';
import GameMenu from './GameMenu';

export default function BookPage() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState((() => (JSON.parse(localStorage.getItem('userSessionPageGroup'))?.page || 1)));
  const [state, setToggleState] = useState(false);
  const [groups, setGroups] = useState(() => (JSON.parse(localStorage.getItem('userSessionPageGroup'))?.groups || 1));
  const { user } = useAuth();
  const userId = user?.userId || user?.id;
  const filters = {
    filtersHard: { $and: [{ 'userWord.difficulty': 'hard' }] },
    filtersPageGroup: { $and: [{ page: page - 1, group: groups - 1 }] },
  };

  const localStoragePageGroup = {
    page,
    groups,
  };

  const toggleState = () => setToggleState(!state);
  const stateDifficultyWords = () => words.every((word) => word?.userWord?.difficulty);
  const stateDifficultyWordsEasy = () => words.every((word) => word?.userWord?.difficulty === 'easy');
  const allWordsSelected = stateDifficultyWords();
  const allWordsSelectedEasy = stateDifficultyWordsEasy();

  useEffect(() => localStorage.setItem('userSessionPageGroup', JSON.stringify(localStoragePageGroup)), [page, groups]);

  useEffect(() => {
    if (user) {
      UserApi.getUserAggregatedWords(userId, 20, filters.filtersPageGroup)
        .then(({ data }) => {
          const { paginatedResults } = data[0];
          setWords(paginatedResults);
        }).catch((error) => console.error(error));
      return;
    }
    noUserApi.getWords(groups, page).then(({ data }) => setWords(data));
  }, [page, groups, state]);

  useEffect(() => {
    if (groups === 7) {
      UserApi.getUserAggregatedWords(userId, 40, filters.filtersHard)
        .then((resHardWords) => setWords(resHardWords.data[0].paginatedResults))
        .catch((error) => console.error('error:', error));
    }
  }, [groups === 7, state]);

  const toggleStyle = () => {
    if (stateDifficultyWords() && groups !== 7) {
      return ({ backgroundColor: '#f9d2df' });
    }
    switch (groups) {
      case 1:
        return ({ boxShadow: '-1px 5px 20px 30px #f9d2df' });
      case 2:
        return ({ boxShadow: '-1px 5px 20px 30px #f7c2d4' });
      case 3:
        return ({ boxShadow: '-1px 5px 20px 30px #f3aec5' });
      case 4:
        return ({ boxShadow: '-1px 5px 20px 30px #f19ab8 ' });
      case 5:
        return ({ boxShadow: '-1px 5px 20px 30px #d77294' });
      case 6:
        return ({ boxShadow: '-1px 5px 20px 30px #c9597f ' });
      case 7:
        return ({ boxShadow: '-1px 5px 20px 30px #ac3b61' });
      default:
        break;
    }
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <Container sx={{ padding: '50px' }} style={toggleStyle()}>
        <ButtonsNavGroups user={userId} groups={groups} setGroups={setGroups} setPage={setPage} />
        <GameMenu disabled={allWordsSelectedEasy} page={page} groups={groups} />
        <Stack spacing={2}>
          {!!words && (
          <Pagination
            count={groups === 7 ? 1 : 30}
            color={allWordsSelected ? 'primary' : 'secondary'}
            size="large"
            page={page}
            onChange={(_, num) => setPage(num)}
            showLastButton
            showFirstButton
            sx={{ marginY: 3, marginX: 'auto' }}
          />
          )}
          <Container maxWidth="lg">
            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
              <CardsBook
                groups={groups}
                toggleState={toggleState}
                userId={userId}
                words={words}
              />
            </Grid>
          </Container>
        </Stack>
      </Container>
    </ThemeProvider>

  );
}
