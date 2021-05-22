import { API } from "../../backend";

export const getCertificate = () => {
    return fetch(`${API}/certificate`, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };