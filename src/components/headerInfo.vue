<template>
	<div class="container">
		<Dropdown placement="bottom"  @on-click="showItem" trigger="hover">
			<div class="down">
				<div class="infoTxt">{{$store.state.username}}</div>
				<img class="img" :src="$store.state.username" alt="">
				<Icon type="md-arrow-dropdown-circle"></Icon>
			</div>
			<DropdownMenu slot="list">
				<DropdownItem name="info">个人信息</DropdownItem>
				<DropdownItem name="loginOut">推出</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	</div>
</template>
<script>
	let _this;
	export default{
		data(){
			return{
			}
		},
		created(){
			_this = this;
		},
		methods:{
			showItem(name){
				console.log(_this.$ajax1)
				switch (name){
					case "loginOut":
					_this.$ajax1.post('/loginout')
					.then(res => {
						if(res.data.loginout){
							_this.$router.push({
								name:'login'
							})
						}else{
							_this.$Modal.error({
								title: "退出失败"
							});
						}
					})
					break;
					case "info":
					break;
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.img{
		width: 50px;
		height: 50px;
		object-fit: cover;
		border-radius: 100%;
		line-height: 50px;
		margin: 0 16px;
	}
	.down{
		display: flex;
		flex-direction: row;
		font-size: 25px;
		display: flex;
		align-items: center;
	}
	.infoTxt{
		    max-width: 126px;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    overflow: hidden;
	}
</style>
