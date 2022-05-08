import { API } from "../configs/Constants";
import includes from "lodash/includes";

function generalUrl(url: string | string[]) {
  let baseURL = API + url;
  return {
    baseURL,
  };
}

const get = (url: any, options = {}, token: any) => {
  return new Promise((resolve, reject) => {
    const { baseURL } = generalUrl(url);
    const contentType = "application/json";
    // console.log(baseURL);
    fetch(baseURL, {
      ...options,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
        "auth-token": token
          ? // `Bearer ${token}`
            token
          : null,
      },
    })
      .then((res) => {
        // console.log("____res", res);
        return res.json();
      })
      .then((resJson) => {
        // if (resJson.message) {
        //   reject(new Error(resJson.message));
        // } else {
        //   resolve(resJson);
        // }
        resolve(resJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const post = (url: any, data: any, method = "POST", token: any) => {
  return new Promise((resolve, reject) => {
    const { baseURL } = generalUrl(url);
    const contentType = includes(url, "upload")
      ? "multipart/form-data"
      : "application/json";
    // console.log(baseURL);
    fetch(baseURL, {
      method: method,
      headers: {
        Accept: "application/json",
        "auth-token": token
          ? // `Bearer ${token}`
            token
          : null,
        "Content-Type": contentType,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        // console.log("____res", res);
        return res.json();
      })
      .then((resJson) => {
        // console.log(resJson)
        // if (resJson?.message) {
        //   reject(resJson.message);
        // }
        // else {
        //   resolve(resJson);
        // }
        resolve(resJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  get,
  post,
  put: (url: any, data: any, token: any) => post(url, data, "PUT", token),
  delete: (url: any, data: any, token: any) => post(url, data, "DELETE", token),
};
