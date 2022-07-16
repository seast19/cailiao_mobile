'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 全局配置
axios.defaults.baseURL = 'http://127.0.0.1:7090/v1';
axios.defaults.baseURL = 'http://192.168.133.1:7090/v1';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 拦截器



// const config = {
// 	baseURL: 'http://127.0.0.1:7090/v1',
// 	timeout: 60 * 1000, // Timeout
// 	// withCredentials: true, // Check cross-site Access-Control
// }

// const _axios = axios.create(config)

axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		// 设置jwt头
		config.headers.jwt = localStorage.getItem('jwt') || ''
		// console.log(config)

		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// // Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Do something with response data
		return response.data
	},
	function (error) {
		// Do something with response error
		return Promise.reject(error)
	}
)

// Plugin.install = function(Vue, options) {
// 	Vue.axios = _axios
// 	window.axios = _axios
// 	Object.defineProperties(Vue.prototype, {
// 		axios: {
// 			get() {
// 				return _axios
// 			}
// 		},
// 		$axios: {
// 			get() {
// 				return _axios
// 			}
// 		}
// 	})
// }

// Vue.use(Plugin)

// export function request() {
// 	return _axios()

// } 
