1.在api里面的user.js里面调用这个获取用户信息这个接口
2.在store的user.js里面将获取用户信息的数据储存在vuex里面，因为后面要频繁用到这个数据
3.在request.js里面设置请求拦截器，统一拦截是否有token这个功能，因为后面有很多接口都需要拦截是否有token
4.在路由守卫里面设置，如果有token，并且不是访问login页面的话，就让路由守卫放行，去调用获取用户信息的这个接口