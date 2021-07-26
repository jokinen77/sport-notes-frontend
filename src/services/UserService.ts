import axios from 'axios';

const baseUrl = "/api/login";

interface LoginInformation {
	username: string;
	password: string;
}

export const login = async (credentials: LoginInformation) => {
  try {
    const res = await axios.post(baseUrl, credentials);
    return res;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};