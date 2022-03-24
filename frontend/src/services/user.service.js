import axios from 'axios';
import {URL} from "../utils";
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ4MTI1MzY0LCJleHAiOjE2NDgyMTE3NjR9.eXWSo2IvwRZHQRrzu6g6rvfkGfJ30vE1Gh1ge276Zek';
export default class UserService {
    static fetchLoggedInUserDetails = async () => {
      return axios.get(`${URL}/user/loggedin`, {
        headers: {
          jwt: token
        }
      });
    }
    static getUsers = async ({page = '1'}) => {
        return await axios.get(`${URL}/users`,
            {
                headers: {
                    jwt: token
                },
                params: {
                    page
                }
            });

    };
    static addUser = async ({ email, password, photo}) => {
        return await axios.post(`${URL}/users`, {
            email,
            password,
            photo
        }, {
            headers: {
                jwt: token
            }
        })
    };

    static updateUser = async (id, { email, password, photo}) => {
        return await axios.put(`${URL}/users/${id}`, {
            email,
            password,
            photo
        }, {
            headers: {
                jwt: token
            }
        })
    };

    static deleteUser = async (id) => {
        return await axios.delete(`${URL}/users/${id}`, {
            headers: {
                jwt: token
            }
        })
    };
};

