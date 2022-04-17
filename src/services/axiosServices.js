import axios from "axios";
import { BASE_URL } from "../utils/apiConstants";

function addParamsToURL(url, params) {
    if (params) {
        let temp = url;
        temp = temp + "/" + params;
        return temp;
    }
    return url;
}

function getService(service) {
    switch (service) {
        case "base":
            return BASE_URL;
        default:
    }
}

export const api = (method, service, endpoint, token, body, params) => {
    switch (method) {
        case "GET":
            // HTTP GET Request - Returns Resolved or Rejected Promise
            return new Promise((resolve, reject) => {
                const SERVICE = getService(service);
                const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);

                axios
                    .get(URL)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        case "POST":
            // HTTP POST Request - Returns Resolved or Rejected Promise
            return new Promise((resolve, reject) => {
                const SERVICE = getService(service);
                const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);

                axios
                    .post(URL, body)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        case "DELETE":
            // HTTP DELETE Request - Returns Resolved or Rejected Promise
            return new Promise((resolve, reject) => {
                const SERVICE = getService(service);
                const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);
                axios
                    .delete(URL)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        case "PUT":
            // HTTP PUT Request - Returns Resolved or Rejected Promise
            return new Promise((resolve, reject) => {
                const SERVICE = getService(service);
                const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);
                axios
                    .put(URL, body)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response.data);
                    });
            });

        default:
            return null;
    }
};
