/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
// import store from '@/store'
// import { getItem } from '@/utils/storage'

/**
  * 用户登录
  */
export const loginAPI = data => {
  return request.post('/v1_0/authorizations', data)
}
export const sendSmsAPI = mobile => {
  return request.get(`/v1_0/sms/codes/${mobile}`)
}
export const getUserInfo = () => {
  // 因为API 接口需要身份权限 所以要设置请求头信息
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return request.get('/v1_0/user/channels')
}

// 批量获取用户频道
export const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 频道请求模块
export const getAllChannel = () => {
  return request.get('/v1_0/channels')
}

// 获取列表频道下数据
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

// 删除用户
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}

// 搜索结果 enter 后触发的请求
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 搜索结果 enter 后触发的请求
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}

export const getArticleById = articleId => {
  return request.get(`/v1_0/articles/${articleId}`)
}

// 关注用户
export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

// 收藏
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

// 评论
export const getComments = params => {
  return request({
    method: 'POST',
    url: 'v1_0/comments',
    params
  })
}
