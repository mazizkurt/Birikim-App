import axios from 'axios';

const API_URL = 'http://apithon.com.tr:3012/v1';

export function getAltin() {
  return axios.get(API_URL + '/altin');
}

export function getDolar() {
  return axios.get(API_URL + '/dolar');
}
