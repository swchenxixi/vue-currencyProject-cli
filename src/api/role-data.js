import axios from 'axios';
import '@/mock/role-mock.js';
async function getRoleTableData(params) {
  let res = await axios.get('/sys/roles/page', params);
  return res.data;
}
async function addRole(params) {
  let res = await axios.post('/sys/roles', params);
  return res.data;
}
async function queryRoleInfo(params) {
  let res = await axios.get('/sys/roles/page', params);
  return res.data;
}
async function queryById(params) {
  let res = await axios.get(`/sys/roles/${params}`);
  return res.data;
}
async function updateRoleInfo(params) {
  let res = await axios.put(`/sys/roles/${params}`);
  return res.data;
}
async function deleteRoleInfo(params) {
  let res = await axios.delete(`/sys/roles/${params}`);
  return res.data;
}
export {
  getRoleTableData,
  addRole,
  queryRoleInfo,
  queryById,
  updateRoleInfo,
  deleteRoleInfo
};
