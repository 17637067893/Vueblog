import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  //用户ID
	  userid:'',
	  //用户名
	  username:'',
	  //文章列表
	  list:[],
	  //导航栏序号
	  index:0,
	  //头像
	  img:''
  },
  mutations: {
	  //更新文章猎豹
	  changeList:function(state,arr){
		  state.list = arr;
	  },
	  // 切换导航栏
	  changeIndex:function(state,num){
		  state.index = num
	  },
	  //保存用户数据
	  saveUser:function(state,obj){
		  state.userid = obj.userid;
		  state.username = obj.username
	  },
	  //保存用户头像
	  saveImg:function(state,val){
	  		  state.img =val
	  }
  },
  actions: {
  },
  modules: {
  }
})
