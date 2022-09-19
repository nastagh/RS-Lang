import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { mainTheme } from '../../utils/theme';
import LevelPick from '../../components/LevelPick';
import WordsService from '../../services/WordsService';
import SprintGame from '../../components/SprintGame';
import SprintScore from '../../components/SprintScore';
import StatisticsService from '../../services/StatisticsService';

import {
  generateRandomIndexes, getRandomIndexesExceptCurrent, mix, randomNumber,
} from '../../utils/random';
import useAuth from '../../hooks/useAuth';
import UserApi from '../../services/UserApi';

const generateGameSetup = (wordsArray) => {
  const gameWordsIndexes = generateRandomIndexes(
    Math.min(wordsArray.length, 10),
    Math.min(wordsArray.length, 20),
  )
    .map((i) => ({
      variants: getRandomIndexesExceptCurrent(Math.min(wordsArray.length, 20), 1, i),
      index: i,
    }));

  const gameWords = gameWordsIndexes.map((e) => {
    const variants = [...e.variants, e.index].map((v) => ({
      word: wordsArray[v].wordTranslate,
      id: wordsArray[v].id,
    }));

    return {
      ...wordsArray[e.index],
      variants: mix(variants),
    };
  });

  return gameWords;
};

export default function Sprint() {
  const [currentStep, setCurrentStep] = useState(1);
  const [words, setWords] = useState([]);
  const [gameScore, setGameScore] = useState();
  const { state } = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (state?.page && state?.groups) {
      if (user) {
        UserApi.getUserAggregatedWords(
          user.id,
          20,
          {
            $and: [{ page: state.page - 1, group: state.groups - 1 },
              { $or: [{ userWord: null }, { 'userWord.difficulty': { $ne: 'easy' } }] }],
          },
        ).then((result) => {
          if (result.data[0].paginatedResults.length < 20) {
            UserApi.getUserAggregatedWords(
              user.id,
              20 - result.data[0].paginatedResults.length,
              {
                $and: [{ page: { $lte: state.page - 2 }, group: state.groups - 1 },
                  { $or: [{ userWord: null }, { 'userWord.difficulty': { $ne: 'easy' } }] }],
              },
            ).then((additional) => {
              const allWords = [
                ...result.data[0].paginatedResults,
                ...additional.data[0].paginatedResults,
              ].map((w) => ({ ...w, id: w._id }));
              setInitialLoad(false);
              if (!allWords.length) {
                return setCurrentStep(4);
              }
              setWords(allWords);
              setCurrentStep(2);
            });
          } else {
            setWords(result.data[0].paginatedResults.map((w) => ({ ...w, id: w._id })));
            setCurrentStep(2);
            setInitialLoad(false);
          }
        });
      } else {
        WordsService.getWords(state.groups - 1, state.page - 1)
          .then((result) => {
            setWords(result.data);
            setCurrentStep(2);
            setInitialLoad(false);
          });
      }
    } else {
      setInitialLoad(false);
    }
  }, [state]);

  const iterateGameStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleGroupSelect = async (groupId) => {
    let result = [];

    if (user) {
      result = (await UserApi.getUserAggregatedWords(
        user.id,
        20,
        { $and: [{ page: 1, group: groupId }] },
      )).data[0].paginatedResults.map((w) => ({ ...w, id: w._id }));
    } else {
      result = (await WordsService.getWords(groupId, randomNumber(0, 29))).data;
    }
    setWords(result);
    iterateGameStep();
  };

  const updateStatistics = async (countRight, countAll) => {
    if (user) {
      let countLearnedWords;
      let countSprintRight;
      let countSprintAll;

      const res = await StatisticsService.getStatistics(user.id);

      if (res.successful) {
        countLearnedWords = (res.data.learnedWords || 0) + countRight;
        countSprintRight = (res.data.optional.sprintRight || 0) + countRight;
        countSprintAll = (res.data.optional.sprintAll || 0) + countAll;
        await StatisticsService.updateStatistics(user.id, countLearnedWords, {
          ...res.data.optional,
          sprintRight: countSprintRight,
          sprintAll: countSprintAll,
        });
      } else {
        await StatisticsService.updateStatistics(user.id, countRight, {
          ...res.data?.optional,
          sprintRight: countRight,
          sprintAll: countAll,
        });
      }
    }
  };

  const handleGameEnd = (result) => {
    iterateGameStep();
    setGameScore(result);
    if (user) {
      result.filter((w) => w.isCorrect).forEach((w) => {
        if (w.userWord) {
          const repeatTimes = (w.userWord.optional?.repeat || 0);
          const right = (w.userWord.optional?.right || 0);
          const useWord = (w.userWord.optional?.useWord || 0);
          let difficulty = 'medium';
          if ((repeatTimes >= 2 && w.userWord.difficulty === 'medium')
          || (repeatTimes >= 4 && w.userWord.difficulty === 'hard')) {
            difficulty = 'easy';
          }

          UserApi.changeStateWordUser(user.id, w.id, difficulty, {
            repeat: repeatTimes + 1,
            right: right + 1,
            use: useWord + 1,
          });
        } else {
          UserApi.createStateWordUser(user.id, w.id, 'medium', { repeat: 1, right: 1, useWord: 1 });
        }
      });

      result.filter((w) => !w.isCorrect).forEach((w) => {
        if (w.userWord) {
          const useWord = (w.userWord.optional?.useWord || 0);

          UserApi.changeStateWordUser(
            user.id,
            w.id,
            w.userWord.difficulty === 'hard' ? 'hard' : 'medium',
            {
              repeat: 0,
              useWord: useWord + 1,
            },
          );
        } else {
          UserApi.createStateWordUser(user.id, w.id, 'medium', { useWord: 1 });
        }
      });
    }
    updateStatistics(result.filter((el) => el.isCorrect).length, result.length);
  };

  const handlePlayAgain = () => {
    setCurrentStep(1);
  };

  let gameComponent = '';
  switch (currentStep) {
    case 4:
      gameComponent = (
        <>Все слова изучены</>
      );
      break;
    case 3:
      gameComponent = (
        <SprintScore gameScore={gameScore} onPlayAgain={handlePlayAgain} />
      );
      break;
    case 2:
      gameComponent = (
        <SprintGame wordsPool={generateGameSetup(words)} onEnd={handleGameEnd} />
      );
      break;
    case 1:
    default:
      gameComponent = (
        <LevelPick
          title="Спринт"
          description="Тренировка для повторения значений слов"
          onSelect={handleGroupSelect}
        />
      );
  }

  return (
    <ThemeProvider theme={mainTheme}>
      {!initialLoad && gameComponent}
    </ThemeProvider>

  );
}
