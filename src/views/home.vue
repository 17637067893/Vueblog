<template>
	<div class="container">
		<div class="top">
			<div>
			</div>
			<div class="nav">
				<navVue></navVue>
				<Input v-model="serachKey" @on-search="searchTitle" class="serachInput" size="large" search enter-button placeholder="标题" />
			</div>
			<div class="info">
				<headerInfo></headerInfo>
			</div>
		</div>
		<div class="right">
			<div v-if="this.$store.state.index =='0'">
				<serach></serach>
			</div>
			<write v-if="this.$store.state.index=='1'"></write>
			<div v-if="this.$store.state.index =='2'">
				<serach></serach>
			</div>
			<div v-if="this.$store.state.index =='3'">
				<serach></serach>
			</div>
		</div>
	</div>
</template>
<script>
	import headerInfo from '@/components/headerInfo'
	import nav from '@/components/nav.vue'
	import serach from '@/components/search.vue';
	import write from '@/components/write.vue';
	import personal from '@/components/personal.vue'
	export default{
		name:"home",
		data(){
			return{
				titleList:[
					{
						title:'发现文章',
						name:'search'
					},
					{
						title:'写文章',
						name:'write'
					},
					{
						title:'个人中心',
						name:'personal'
					}
				],
				isShow:'search',
				navIndex:'0',
				serachKey:''
			}
		},
		computed:{
		},
		created(){
			console.log(this.$store.state)
			this.$store.commit("changeIndex",'0')
		},
		mounted(){
			console.log(this.$store.state.list);
		},
		methods:{
			//按标题搜索文章
			searchTitle(value){
				let _this=this;
				this.$ajax1.post('/searchtitle',{'title':value,'userid':this.$store.state.userid})
				.then(res => {
					console.log(res);
					if(res.data.length>0){
						_this.$store.commit('changeList',res.data)
						_this.$store.commit('changeIndex',0)
						_this.serachKey = ""
					}else{
						_this.$Modal.warning({
							title:'暂无此类文章'
						});
					}
				})
			}
		},
		components:{
			serach,
			write,
			personal,
			navVue:nav,
			headerInfo
		},
		watch:{
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.container{
		display: flex;
		flex-direction: row;
		background-color:#AFEEEE;
		justify-content: center;
		margin-right: 20px;
	}
	.info{
		display:flex;
	}
	.top{
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width:100vw;
		z-index: 1;
		height: 100px;
		background-color: #AFEEEE;;
	}
	.right{
		padding-top: 24vh;
		min-height: 100vh;
	}
	.btn-box{
		width: 100%;
		margin-top: 3vh;
	}
	.box-avatar{
		width: 8rem;
		span{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.img{
		width: 50px;
		height: 50px;
		border-radius: 100%;
		object-fit: cover;
	}
	.nav{
		display: flex;
		flex-direction: row;
		padding-left: 150px;
	}
	.serachInput{
		width: 25vw;
		margin-top: 10px;
	}
	.serachInput>.ivu-input-search{
		background-color: #EEEE00 !important;
	}
</style>

