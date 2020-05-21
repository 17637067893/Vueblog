<template>
	<div class="container">
			<div class="onfo-box">
				<div class="title-box">
					<div class="title">标题</div>
					<img class="img"  :src="info.img" alt="">
				</div>
				<div v-if="$store.state.userid == info.userid">
					<Button @click="edit" class="btn" size="large" type="warning">编辑</Button>
					<Button @click="shanchu(info)" style="margin-left: 20px;" class="btn" size="large" type="warning">删除</Button>
				</div>
				<div class="btn-box">
					<div style="margin-right: 60px;">
						<headerInfo></headerInfo>
					</div>
					<Button @click="goBack" class="btn" size="large" type="primary">返回</Button>
				</div>
				
			</div>
			<div class="content" v-html="info.content">
			</div>
	</div>
</template>
<script>
	let _this
	import headerInfo from '@/components/headerInfo'
	export default{
		data(){
			return{
				info:{}
			}
		},
		created(){
			_this = this;
			this.info = this.$route.query.item
			console.log(this.$store.state.userid,this.info.userid)
		},
		methods:{
			//返回上页
			goBack(){
				this.$router.back();
			},
			//编辑文章
			edit(){
				this.$router.push({
					name:'write',
					query:{
						item:this.info
					}
				})
			},
			//删除文章
			shanchu(item){
				 console.log(item)
				this.$ajax1.post('/delete',{id:item.id})
				.then(res => {
					if(res.data.data){
						_this.$Message.success('删除成功');
						_this.$router.back();
					}else{
						_this.$Message.error('删除失败');
					}
				})
			}
		},
		components:{
			headerInfo
		}
	}
</script>

<style scoped="scoped">
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.onfo-box{
		display: flex;
		width: 80vw;
		line-height: 60px;
		flex-direction: row;
		margin-top: 20px;
		justify-content: space-between;
	}
	.img{
		width: 60px;
		height: 60px;
		border-radius: 10px;
		object-fit: cover;
	}
	.title{
		font-size:40px;
		margin-right: 40px;
	}
	.content{
		margin-top: 1vh;
		width: 80vw;
		border: 1px dashed gray;
		padding: 10px;
	}
	.btn-box{
		display: flex;
		align-items: center;
	}
	.btn{
		font-size:16px;
	}
	.title-box{
		display: flex;
		flex-direction: row;
	}
	
</style>
