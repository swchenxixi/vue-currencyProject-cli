import axios from 'axios';
import '@/mock/ships-mock.js';
async function getShipsTableData(params) {
  let res = await axios.get('/ship/ship/page', params);
  return res.data;
}
async function addShip(params) {
  let res = await axios.post('/ship/ship', params);
  return res.data;
}
async function queryShipById(params) {
  let res = await axios.get(`/ship/ship/${params}`);
  return res.data;
}
async function updateShipInfo(params) {
  let res = await axios.put(`/ship/ship/${params}`);
  return res.data;
}
async function deleteShipInfo(params) {
  let res = await axios.delete(`/ship/ship/${params}`);
  return res.data;
}
async function getAllShips() {
  let res = await axios.get('/ship/ship');
  return res.data;
}

export {
  getShipsTableData,
  addShip,
  queryShipById,
  updateShipInfo,
  deleteShipInfo,
  getAllShips
};
