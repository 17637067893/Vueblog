<template>
	<div>
		<div v-if="this.$store.state.list.length == 0">
			<p>暂无内容</p>
		</div>
		<div v-else @click="goInof(item)" class="search-box" v-for="(item,index) in this.$store.state.list" :key="index">
			 <Card class="card-box">
				<div class="title" slot="title" style="font-size: 20px;font-weight: 600;">
					<div class="txt">{{item.title}}</div>
					<div class="btn-box" v-if="$store.state.userid == item.userid">
						<div v-if="item.status == '0'">
							<Button size="small" @click.stop="changeState(item)" type="info">发表</Button>
						</div>
						<div v-if="item.status == '1'">
							<Button size="small" @click.stop="changeState(item)" type="info">保存</Button>
						</div>
						<div style="margin-right: 16px;">
							<Button size="small" @click.stop="shanchu(item)" type="error">删除</Button>
						</div>
					</div>
				</div>
				<p style="font-size: 18px;" v-html="item.content"></p>
			</Card>
			<div class="img-box">
				<img :src="item.img" alt="图片">
			</div>
		</div>
	</div>
</template>

<script>
	let _this;
	export default{
		name:'search',
		data(){
			return{
				articleList:[]
			}
		},
		created(){
			_this=this;
			console.log(this.$store.state)
		},
		computed:{
		},
		 mounted () {
		 },
		destroyed () {
		 },
		 methods:{
			 //查看详情
		 goInof(item){
			 this.$router.push({
				 name:'info',
				 query:{
					 'item':item
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
					_this.getList();
				}else{
					_this.$Message.error('删除失败');
				}
			})
		 },
		 //改变状态
		 changeState(item){
			 let status = 1
			 let txt = "文章已发表"
			 if(item.status == 1){
				 status = 0
				 txt = "文章已保存"
			 }
			 this.$ajax1.post('/changeStatus',{'status':status,'id':item.id})
			 .then(res =>{
				 if(res.status == 200){
					 _this.$Modal.success({
							title:txt
						});
						_this.getList()
				 }else{
					 _this.$Modal.error({
							title:'操作失败'
						});
				 }
			 })
			 .catch(err => {console.log(err)})
		 },
		 //获取文章列表
		 getList(index){
		 	let _this=this;
			let obj
			if(this.$store.state.index == 0){
				obj = {
					status:this.$store.state.index
				}
			}else{
				obj = {
					status:this.$store.state.index,
					userid:this.$store.state.userid,
				}
			}
		 	this.$ajax1.post('/getList',obj)
		 	.then((res) => {
		 		let arr = res.data.data.data
		 		console.log(arr)
		 		_this.$store.commit('changeList',arr)
		 	})
		 	.catch((err) => {
		 		console.log(err)
		 	})
		 }
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.search-box{
		display: flex;
		flex-direction: row;
		padding: 10px;
		height: 170px;
		margin-left: 3vw;
	}
	.card-box{
		width: 60vw;
		overflow: hidden;
		margin-right: 10px;
	}
	.img-box{
		width: 10vw;
		img{
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 5%;
		}
		
	}
	.title{
		display: flex;
		flex-direction:row;
		justify-content: space-between;
	}
	.txt{
		max-width: 46vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.btn-box{
		display: flex;
		justify-content: space-between;
		flex-direction: row-reverse;
		width: 7vw;
		padding: 1px 5px;
	}
</style>
