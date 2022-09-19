import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Stack, ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import StatisticsService from '../../services/StatisticsService';
import { mainTheme } from '../../utils/theme';

function StatisticPage() {
  const [statistics, setStatistics] = useState(0);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      StatisticsService.getStatistics(user.id)
        .then(({ data }) => {
          if (data) {
            const { learnedWords, optional } = data;
            const newStatistics = { learnedWords, ...optional };
            setStatistics(newStatistics);
          }
        });
    }
  }, []);

  const resultPercent = () => (
    Math.round((statistics.learnedWords / (statistics.audioCallAll + statistics.sprintAll)) * 100)
  );

  return (
    <ThemeProvider theme={mainTheme}>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Статистика за сегодня
        </Typography>
        <Stack direction="row" justifyContent="space-around">
          <Box>
            <Typography variant="h2" color="green" component="p">
              {statistics.learnedWords || 0}
            </Typography>
            <Typography variant="h5" color="#ac3b61" component="p">
              слов изучено
            </Typography>
          </Box>
          <Box>
            <Typography variant="h2" color="green" component="p">
              {resultPercent() || 0}
              %
            </Typography>
            <Typography variant="h5" color=" #ac3b61" component="p">
              правильных ответов
            </Typography>
          </Box>
        </Stack>

      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={5} alignItems="flex-center">
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardHeader
                title="Аудиовызов"
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{
                  align: 'center',
                }}
                sx={{
                  backgroundColor: '#f9d2df',
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                />
                <ul>
                  <Typography
                    variant="subtitle2"
                    align="left"
                  >
                    <span style={{ paddingRight: '5px' }}>изучено слов :</span>
                    {statistics.audioCallRight || 0}

                  </Typography>
                  <Typography
                    variant="subtitle2"
                    align="left"
                  >
                    <span style={{ paddingRight: '5px' }}>  правильных ответов:</span>
                    {statistics.audioCallRight || 0}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    align="left"
                  >
                    <span style={{ paddingRight: '5px' }}>длинная серия ответов : 0</span>
                  </Typography>

                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardHeader
                title="Cпринт"
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{
                  align: 'center',
                }}
                sx={{
                  backgroundColor: '#f9d2df',
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                />
                <ul>
                  <Typography
                    variant="subtitle2"
                    align="left"
                  >
                    <span style={{ paddingRight: '5px' }}> изучено слов :</span>
                    {statistics.sprintRight || 0}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    align="left"
                  >
                    <span style={{ paddingRight: '5px' }}>
                      {' '}
                      правильных ответов: :
                      {' '}
                      {statistics.sprintRight || 0}
                    </span>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    align="left"
                  >
                    <span style={{ paddingRight: '5px' }}> длинная серия ответов : 0</span>
                  </Typography>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

    </ThemeProvider>

  );
}

export default StatisticPage;
