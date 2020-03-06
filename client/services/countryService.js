import { outsideRequest } from "./httpService";

const getCountries = async () =>
  outsideRequest("get", "https://restcountries.eu/rest/v2/all");

export { getCountries };
