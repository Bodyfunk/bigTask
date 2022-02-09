import request from '@/utils/request'

// sfcp查询设备模版列表
export function listEquipment(query) {
  return request({
    url: '/v1/equipment_temp',
    method: 'get',
    params: query
  })
}

// sfcp新建设备模版
export function createEquipmentTemp(data) {
  return request({
    url: '/v1/equipment_temp',
    method: 'post',
    data: data
  })
}

// sfcp删除设备模版
export function delEquipmentTemp(id) {
  return request({
    url: '/v1/equipment_temp/' + id,
    method: 'delete',
  })
}

// sfcp修改设备模版
export function updateEquipmentTemp(data, id) {
  return request({
    url: '/v1/equipment_temp/' + id,
    method: 'put',
    data: data
  })
}

// sfcp克隆设备模版
export function cloneEquipmentTemp(id) {
  return request({
    url: '/v1/equipment_temp/' + id +'/clone',
    method: 'post',
  })
}

// sfcp获取设备模版详情
export function getEquipmentTempInfo(id) {
  return request({
    url: '/v1/equipment_temp/' + id,
    method: 'get',
  })
}

// sfcp查询设备台账列表
export function listEquipmentAccount(query) {
  return request({
    url: '/v1/equipment_test',
    method: 'get',
    params: query
  })
}

// sfcp新建设备台账
export function createEquipmentTest(data) {
  return request({
    url: '/v1/equipment_test',
    method: 'post',
    data: data
  })
}

// sfcp删除设备台账
export function delEquipmentAccount(id) {
  return request({
    url: '/v1/equipment_test/' + id,
    method: 'delete',
  })
}

// sfcp修改设备台账
export function updateEquipmentAccount(data, id) {
  return request({
    url: '/v1/equipment_test/' + id,
    method: 'put',
    data: data
  })
}

//sfcp获取客户验收
export function getEquipmentAcceptanceClient(equipment_id) {
  return request({
    url: '/v1/equipment_test/' + equipment_id + '/acceptance_client/all',
    method: 'get',
    // params: query
  })
}

//sfcp新增客户验收
export function createEquipmentAcceptanceClient(data, equipment_id) {
  return request({
    url: '/v1/equipment_test/' + equipment_id + '/acceptance_client',
    method: 'post',
    data: data
  })
}

// sfcp新增出厂验收
export function createEquipmentAcceptanceFactory(data, equipment_id) {
  return request({
    url: '/v1/equipment_test/' + equipment_id + '/acceptance_factory',
    method: 'post',
    data: data
  })
}

//sfcp获取客户验收
export function getEquipmentAcceptanceFactory(equipment_id) {
  return request({
    url: '/v1/equipment_test/' + equipment_id + '/acceptance_factory/all',
    method: 'get',
    // params: query
  })
}

//sfcp获取设备列表
export function listRealEquipment(query) {
  return request({
    url: '/v1/equipment',
    method: 'get',
    params: query
  })
}