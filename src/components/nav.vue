<template>
	<div class="container">
		<ul>
			<li :class="[activeClass==index ? 'active' : '']" @click=" getItem($event,index)" :key="index" v-for="(item,index) in list" ><a href="#">{{item.txt}}</a></li>
			<li class="slide"></li>
		</ul>

	</div>
</template>
<script>
	export default{
		data(){
			return{
				list:[
					{txt:'首页'},
					{txt:'写文章'},
					{txt:'已发表'},
					{txt:'已保存'}
				],
			}
		},
		created(){
			this.getList(this.$store.state.index)
		},
		computed:{
			activeClass:function(){
				return this.$store.state.index;
			}
		},
		methods:{
			 getItem:function (e,index) {
			   this.$store.commit('changeIndex',index)
			   if(this.$store.state.index == '1'){
				   this.$router.push({
					   name:'write'
				   })
			   }else{
				   this.getList(index)
			   }
			  
			},
			//获取文章列表
			getList(index){
				let _this=this;
				let obj = {
					status:index,
					userid:this.$store.state.userid
				}
				console.log(this.$store.state)
				this.$ajax1.post('/getList',obj)
				.then((res) => {
					let arr = res.data.data.data
					console.log(arr)
					_this.$store.commit('changeList',arr)
					_this.$store.commit('changeIndex',index)
				})
				.catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>
<style scoped="scoped">
	.container{
		margin: 0;
		padding: 0;
		font-family: sans-serif;
		position: relative;
	}
	ul{
		display: flex;
		background-color: #CFCFCF;
		border-radius: 30px;
		overflow: hidden;
		box-shadow: 0 0 0 5px #5F9EA0;
		margin: 0;
		padding: 0;
	}
	ul li{
		list-style: none;
		width: 150px;
	}
	ul li.active{
		background-color: #EEEE00;
	}
	ul li a {
		display: block;
		padding: 14px;
		text-align: center;
		color: #FFF;
		transition: 0.5s;
		text-decoration: none;
		font-size: 22px;
	}
	ul li.active a{
		color: #262626;
		font-size: 22px;
	}
	.slide{
		position: absolute;
		width: 150px;
		height: 100%;
		top: 0;
		left: 0;
		background-color: #FFF;
		z-index: -1;
		transition: 0.5s;
		opacity: 0;
	}
	ul li:nth-child(1).active ~ .slide{
		left: 0;
		opacity: 1;
	}
	ul li:nth-child(2).active ~ .slide{
		left: 150px;
		opacity: 1;
	}
	ul li:nth-child(3).active ~ .slide{
		left: 300px;
		opacity: 1;
	}
	ul li:nth-child(4).active ~ .slide{
		left: 450px;
		opacity: 1;
	}
	ul li:nth-child(5).active ~ .slide{
		left: 600px;
		opacity: 1;
	}
</style>