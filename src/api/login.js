import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 手机验证码登陆方法
export function phoneLogin(mobile, code) {
  const data = {
    mobile,
    code
  }
  return request({
    url: '/v1/auths',
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
// export function getInfo() {
//   return request({
//     url: '/getInfo',
//     method: 'get'
//   })
// }
// sfcp获取用户详情
export function getInfo() {
  return request({
    url: '/v1/auths',
    method: 'get'
  })
}

// 退出方法
// export function logout() {
//   return request({
//     url: '/logout',
//     method: 'post'
//   })
// }

// sfcp退出方法
export function logout() {
  return request({
    url: '/v1/auths',
    method: 'delete'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get',
    timeout: 20000
  })
}

// 获取手机验证码
export function getPhoneCode(mobile) {
  const data = {
    mobile
  }
  return request({
    url: '/verificationCodes',
    method: 'post',
    data: data,
    timeout: 20000,
  })
}