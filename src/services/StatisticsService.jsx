import axios from '../utils/axios';

const paths = {
  statistics: '/statistics',
  users: '/users',
};

export default class StatisticsService {
  static getStatistics(userId) {
    return axios.get(`${paths.users}/${userId}${paths.statistics}`);
  }

  static updateStatistics(userId, countLearnedWords, optional = {}) {
    return axios.put(`${paths.users}/${userId}${paths.statistics}`, {
      learnedWords: countLearnedWords,
      optional: { ...optional },
    });
  }
}
