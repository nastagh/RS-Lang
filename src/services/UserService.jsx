import axios from '../utils/axios';

const paths = {
  signIn: '/signin',
  users: '/users',
};

export default class UserService {
  static login(email, password) {
    return axios.post(paths.signIn, { email, password });
  }

  static registration(name, email, password) {
    return axios.post(paths.users, { name, email, password });
  }

  static getUser(userId) {
    return axios.get(`${paths.users}/${userId}`);
  }
}
