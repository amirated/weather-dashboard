import axios from "axios";

export const getAPI = (url: string) => {
    return axios.get(url)
      .then((response) => {
        return response.data;
    });
};