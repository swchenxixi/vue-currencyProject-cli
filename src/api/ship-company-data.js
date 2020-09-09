import axios from 'axios';
import '@/mock/ship-company-mock.js';
async function getCompaneTableData(params) {
  let res = await axios.get('/ship/shipCompany/page', params);
  return res.data;
}
async function addCompany(params) {
  let res = await axios.post('/ship/shipCompany', params);
  return res.data;
}
async function queryById(params) {
  let res = await axios.get(`/ship/shipCompany/${params}`);
  return res.data;
}
async function updateCompanyInfo(params) {
  let res = await axios.put(`/ship/shipCompany/${params}`);
  return res.data;
}
async function deleteCompanyInfo(params) {
  let res = await axios.delete(`/ship/shipCompany/${params}`);
  return res.data;
}
async function getAllCompany() {
  let res = await axios.get('/ship/shipCompany');
  return res.data;
}

export {
  getCompaneTableData,
  addCompany,
  queryById,
  updateCompanyInfo,
  deleteCompanyInfo,
  getAllCompany
};
