import request from '@/utils/request'

// 获取路由
// export const getRouters = () => {
//   return request({
//     url: '/getRouters',
//     method: 'get'
//   })
// }
// sfcp获取路由
export const getRouters = () => {
  return request({
    url: '/v1/auths/menu',
    method: 'get'
  })
}