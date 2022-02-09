import request from '@/utils/request'

// 查询岗位列表
// export function listPost(query) {
//   return request({
//     url: '/system/post/list',
//     method: 'get',
//     params: query
//   })
// }

// sfcp获取角色列表
export function listPost(query) {
  return request({
    url: '/v1/role',
    method: 'get',
    params: query
  })
}

// sfcp获取权限列表
export function listPermission(query) {
  return request({
    url: '/v1/permission',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
// export function getPost(postId) {
//   return request({
//     url: '/system/post/' + postId,
//     method: 'get'
//   })
// }

// sfcp获取角色详情
export function getPost(postId) {
  return request({
    url: '/v1/role/' + postId,
    method: 'get'
  })
}
// 新增岗位
// export function addPost(data) {
//   return request({
//     url: '/system/post',
//     method: 'post',
//     data: data
//   })
// }

// sfcp新增角色
export function addPost(data) {
  return request({
    url: '/v1/role',
    method: 'post',
    data: data
  })
}
// 修改岗位
// export function updatePost(data) {
//   return request({
//     url: '/system/post',
//     method: 'put',
//     data: data
//   })
// }

// sfcp修改角色
export function updatePost(data, id) {
  return request({
    url: '/v1/role/' + id,
    method: 'put',
    data: data
  })
}
// 删除岗位
// export function delPost(postId) {
//   return request({
//     url: '/system/post/' + postId,
//     method: 'delete'
//   })
// }

// 删除角色
export function delPost(postId) {
  return request({
    url: '/v1/role/' + postId,
    method: 'delete'
  })
}
// 导出岗位
export function exportPost(query) {
  return request({
    url: '/system/post/export',
    method: 'get',
    params: query
  })
}