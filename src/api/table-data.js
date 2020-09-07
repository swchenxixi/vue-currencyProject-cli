import axios from 'axios';
async function getTableData(params) {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return null;
  //   }
  let res = await axios.post('/api/table/getTableData', params);
  return res.data;
}
export {
  getTableData,
};