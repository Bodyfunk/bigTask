import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";


// sfcp查询公司列表
export function listCompany(query) {
  return request({
    url: '/v1/company',
    method: 'get',
    params: query
  })
}
// sfcp查询所有公司列表-无分页
export function listCompanyAll() {
  return request({
    url: '/v1/company/all',
    method: 'get',
  })
}

// sfcp获取公司详情
export function getCompany(id) {
  return request({
    url: '/v1/company/' + praseStrEmpty(id),
    method: 'get'
  })
}

// sfcp新建公司
export function addCompany(data) {
    return request({
      url: '/v1/company',
      method: 'post',
      data: data
    })
  }

// sfcp修改公司
export function updateCompany(data, id) {
  return request({
    url: '/v1/company/' + praseStrEmpty(id),
    method: 'put',
    data: data
  })
}

// sfcp删除公司
export function delCompany(id) {
  return request({
    url: '/v1/company/' + id,
    method: 'delete'
  })
}
// sfcp查询地区下拉树结构
export function treeselect() {
  return request({
    url: '/common/area',
    method: 'get'
  })
}

// sfcp查询省份列表
export function listProvince(query) {
  return request({
    url: '/common/area_info',
    method: 'get',
    params: query
  })
}