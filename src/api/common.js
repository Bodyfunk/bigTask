import request from '@/utils/request'

// sfcp获取设备类型
export function getEquipmentType(query) {
  return request({
    url: '/common/equipment_type',
    method: 'get',
    params: query
  })
}

// sfcp获取设备标记
export function getEquipmentTag(query) {
  return request({
    url: '/common/equipment_tag',
    method: 'get',
    params: query
  })
}

// sfcp获取验收状态
export function getAcceptanceStatus(query) {
    return request({
      url: '/common/acceptance_status',
      method: 'get',
      params: query
    })
  }

  //sfcp上传文件
export function upload(data) {
  return request({
    url: '/common/upload',
    method: 'post',
    data: data
  })
}

// sfcp删除文件
//sfcp上传文件
export function deleteFile(id) {
  return request({
    url: '/common/upload/' + id,
    method: 'delete',
    
  })
}