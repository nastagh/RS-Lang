import axios from '../utils/axios';

const paths = {
  words: '/words',
};

export default class WordsService {
  static getWords(groupId, pageNumber) {
    return axios.get(`${paths.words}`, {
      params: {
        group: groupId,
        page: pageNumber,
      },
    });
  }
}
