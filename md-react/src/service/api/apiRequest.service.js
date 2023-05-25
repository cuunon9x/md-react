import axios from "axios";
import qs from "qs";
import { CANCEL } from "redux-saga";
import { optionsError } from "./toast.service";
import { toast } from "react-toastify";
import { history } from "index";
import ROUTES from "constant/routers.constant";

const CancelToken = axios.CancelToken;

let apiUrl = process.env.REACT_APP_API_URL;
const baseUrl = "http://localhost:25808/api";
const api = axios.create({
  // withCredentials: true,
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { indices: false });
  },
});

// Implement request cancel
export function get(url, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .get(baseUrl + url, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

export function getParams(url, params = null) {
  return api
    .get(baseUrl + url, {
      params: params,
    })
    .then(mapData)
    .catch(mapErrorCallAPI);
}

export function createData(url, data, config = {}) {
  let cancel;
  const request = api
    .post(baseUrl + url, data)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

function mapData(res) {
  return res?.data || res;
}

function mapErrorCallAPI(err) {
  // const token = jwt_decode(localStorage.getItem(AUTH_TOKEN));
  if (err) {
    if (err.response?.data?.type === "BAD_REQUEST") {
      toast(err.response?.data?.description, optionsError);
    } else if (err.response?.data?.type === "NOT_FOUND") {
      toast(err.response?.data?.error, optionsError);
    } else {
      toast("Error, try again later!", optionsError);
    }
    if (
      !err?.request?.responseURL?.includes("login") &&
      err.response &&
      err.response.status === 403
    ) {
      history.push(ROUTES.NOT_FOUND.USE_ROLE);
    }
    if (
      err?.request?.responseURL?.includes("login") &&
      err.response &&
      err.response.status === 403
    ) {
      history.push("/auth");
    }
  }
  throw err;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getParams,
};
