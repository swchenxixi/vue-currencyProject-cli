import axios from 'axios';
import '@/mock/shipLine-mock.js';
//获取港口分页数据
async function getLineData(params) {
  let res = await axios.get('/ship/voyage/page', params);
  return res.data;
}
//删除某条港口数据
async function delLineData(params) {
  let res = await axios.delete(`/ship/voyage/${params}`);
  return res.data;
}
//根据id获取港口
async function getLineDetailData(params) {
  let res = await axios.get(`/ship/voyage/${params}`);
  return res.data;
}
//修改港口信息
async function editLineData(params) {
  let res = await axios.put(`/ship/voyage/${params}`);
  return res.data;
}
//添加港口数据
async function addLineData(params) {
  let res = await axios.post('/ship/voyage', params);
  return res.data;
}

export {
  getLineData,
  delLineData,
  editLineData,
  addLineData,
  getLineDetailData
};
