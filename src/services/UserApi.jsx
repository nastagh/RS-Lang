import axios, { baseUrl } from '../utils/axios';

const paths = {
  users: 'users/',
  words: '/words/',
  aggregatedWords: '/aggregatedWords',
};

export default class UserApi {
  static async getUserWords(userId) {
    if (userId) {
      const response = await axios.get(`${baseUrl}/${paths.users}${userId}${paths.words}`);
      return response;
    }
    return 'please signing';
  }

  static async createStateWordUser(userId, wordId, stateWord, optional = {}) {
    if (userId) {
      return axios.post(`${baseUrl}/${paths.users}${userId}${paths.words}/${wordId}`, {
        difficulty: `${stateWord}`,
        optional: { ...optional },
      });
    }
    return 'please signing';
  }

  static async changeStateWordUser(userId, wordId, difficulty, optional = {}) {
    if (userId) {
      return axios.put(`${baseUrl}/${paths.users}${userId}${paths.words}/${wordId}`, {
        difficulty: `${difficulty}`,
        optional: { ...optional },
      });
    }
    return 'please signing';
  }

  static async getUserAggregatedWord(userId, wordId) {
    if (userId) {
      return axios.get(`${baseUrl}/${paths.users}${userId}${paths.aggregatedWords}${wordId}`);
    }
    return 'please signing';
  }

  static async getUserAggregatedWords(userId, wordsPerPage, filter) {
    if (userId) {
      return axios.get(
        `${baseUrl}/${paths.users}${userId}${paths.aggregatedWords}`,
        { params: { wordsPerPage, filter } },
      );
    }
  }

  static async deleteUserWord(userId, wordId) {
    if (userId) {
      axios.delete(
        `${baseUrl}/${paths.users}${userId}${paths.words}/${wordId}`,
      );
    }
    return 'please signing';
  }
}
