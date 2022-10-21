// 用户登录信息
import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data
  })
}

// 短信验证接口
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/sms/codes/${mobile}`
  })
}
