import axios from 'axios'
import baseURLConfig from './config-baseURL'

//统一设置post请求的Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//服务端线上url地址
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true

//封装request函数
export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >=200 && status < 300) || status === 400
      }
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then(res => {
      if(res.status === 200) {
        resolve(res.data)
      }else {
        console.error(res.data)
        reject(res.data)
      }
    }).catch(err=>{
      console.error({msg: '网络异常'})
      reject({msg: '网络异常'})
    })
  })
}
