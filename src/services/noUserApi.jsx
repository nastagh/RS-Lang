import axios from 'axios';
import { baseUrl } from '../utils/axios';

export default class noUserApi {
  static async getWords(groups, page) {
    const res = await axios.get(`${baseUrl}/words?group=${groups - 1}&page=${page - 1}`);
    return res;
  }
}
