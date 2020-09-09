import axios from 'axios';
import '@/mock/port-mock.js';
//获取港口分页数据
async function getPortData(params) {
  let res = await axios.get('/ship/harbor/page', params);
  return res.data;
}
//删除某条港口数据
async function delPortData(params) {
  let res = await axios.delete(`/ship/harbor/${params}`);
  return res.data;
}
//根据id获取港口
async function getPortDetailData(params) {
  let res = await axios.get(`/ship/harbor/${params}`);
  return res.data;
}
//修改港口信息
async function editPortData(params) {
  let res = await axios.put(`/ship/harbor/${params}`);
  return res.data;
}
//添加港口数据
async function addPortData(params) {
  let res = await axios.post('/ship/harbor', params);
  return res.data;
}
//获取全部港口列表数据
async function getAllPortData(params) {
  let res = await axios.get('/ship/harbor', params);
  return res.data;
}

export {
  getPortData,
  delPortData,
  addPortData,
  editPortData,
  getPortDetailData,
  getAllPortData
};
