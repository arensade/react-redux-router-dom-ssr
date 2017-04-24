import axios from 'axios';

const BASE_URL = "http://localhost:3000/";

export const getUserLists = () => {
    return axios.get(`${BASE_URL}data/userList.json`)
};
