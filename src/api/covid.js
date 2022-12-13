import axiosClient from './api';
import axiosClientV2 from './apiV2';
const covid = {
  getAll:() => {
    const url = "/summary";
    return axiosClient.get(url);
  },
  getDetail:(col) => {
    const url = `/v2/alpha/${col}`;
    return axiosClientV2.get(url);
  }
}
export default covid