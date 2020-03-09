import { get } from "lodash";

const createFormData = (dataObject = {}) => {
  const formData = new FormData();
  for (let key in dataObject) {
    formData.set(key, dataObject[key]);
  }
  return formData;
};

const getErrorMessage = errObject => {
  const firstCase = get(errObject, "response.data.message");
  const secondCase = get(errObject, "response.data.error");
  return firstCase || secondCase || "Something went wrong";
};

const storeAndGetUrlParams = (url, paramsObject) => {
  const usp = new URLSearchParams(url);
  for (let key in paramsObject) {
    if (usp.has(key)) {
      usp.delete(key);
    }
    usp.append(key, paramsObject[key]);
  }
  return usp;
};

export { createFormData, getErrorMessage, storeAndGetUrlParams };
