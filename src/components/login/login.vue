<template>
	<div class="body">
				<!--<img src="img/tubiao-09.png" class="logo" />-->
				<p class="logo">个人博客</p>
				<div class="body_count">
					<div class="login_count">
						<div class="login_count_a" v-if="showQR">
							<div class="login_count_a_l">
								<div class="login_a_l_t">扫码登录点这里</div>
								<div class="triangle"></div>
								<img src="../../static/img/tubiao-02.png" @click="changeLogin" class="icon_e" />
							</div>
							<div id="all">
								<ul id="option">
									<li @click="loginLeft" class="login_left" :class="{ 'active': isActive }">登录</li>
									<li  @click="loginRight" class="login_right" :class="{ 'active': !isActive }">注册</li>
	
								</ul>
								<ul id="card">
									<li :class="{ 'active': isActive }">
										<!--输入框-->
										<div class="login_bot_count">
											<img src="../../static/img/tubiao-07.png" alt="" />
											<input @change="checkname" type="" v-model="username" name="" id="" placeholder="请输入账号"id="one" />
										</div>
										<div class="err-box">
											<span v-show="showUser2" class="err-word">用户名不存在</span>
										</div>
										<div class="login_bot_count">
											<img src="../../static/img/tubiao-06.png" alt="" />
											<input type="password"  v-model="password" name="" id="" placeholder="请输入密码"id="one"  />
										</div>
										<div class="err-box">
											<span v-show="showPassword" class="err-word">输入密码</span>
										</div>
										<!-- <div class="login_bot">
											<a>忘记密码?</a>
											<p><input type="checkbox" name="vehicle" value="Bike" />记住密码</p>
										</div> -->
										<!--登录按钮-->
										<button @keyup.enter="enterLogin" @click="login" class="login_button">登录</button>
									</li>
									<li class="login_account" :class="{ 'active': !isActive }">
										<div>
											<uploadImg></uploadImg>
										</div>
										<!--输入框-->
										<div class="login_bot_count">
											<img src="../../static/img/tubiao-07.png" alt="" />
											<input  @change="checkname" v-model="username"  name="" id="" placeholder="请输入账号"id="one" />
										</div>
										<div class="err-box">
											<span v-show="showUser1" class="err-word">用户名已存在</span>
										</div>
										<div class="login_bot_count">
											<img src="../../static/img/tubiao-06.png" alt="" />
											<input v-model="password" type="password" name="" id="" placeholder="请输入密码"id="one"  />
										</div>
										<div class="err-box">
											<span v-show="showPassword" class="err-word">请输入密码</span>
										</div>
										<!-- <div class="login_account_count">
											<img src="../../static/img/tubiao-05.png" alt="" />
											<select class="account_select">
												<option value="+86">+86</option>
												<option value="+852">+852</option>
												<option value="+853">+853</option>
												<option value="+886">+886</option>
											</select>
											<img src="../../static/img/line-down.png" alt="" class="account_select_icon" />
											<input type="" name="" class="mobile_input" placeholder="请输入手机号码"id="aa"  />
										</div>
										<div class="login_account_counts">
											<img src="../../static/img/tubiao-06.png" alt="" />
											<input type="" name="" id="" placeholder="请输入验证码" />
											<input class="account_code" type="button" id="btn"value="获取验证码" />
										</div> -->
										<!--登录按钮-->
										<button @keyup.enter="enterLogin" @click="register" class="login_account_button">注册</button>
									</li>
								</ul>
							</div>
	
						</div>
	
						<div class="login_count_b" v-if="!showQR">
							<div class="login_count_b_l">
								<div class="login_b_l_t">账号登录点这里</div>
								<div class="triangle"></div>
								<img src="../../static/img/tubiao-03.png" @click="changeLogin" class="icon_z" />
							</div>
							<div class="login_b_title">
								<img src="../../static/img/tubiao-04.png" alt="" /> 微信扫码登录
							</div>
							<img src="../../static/img/ewm.png" class="libqr" />
							<p class="libqr_text">请使用微信扫描二维码登录</p>
						</div>
	
					</div>
	
				</div>
			</div>
</template>
<script>
	import uploadImg from '@/components/uploadImg.vue'
	export default{
		data(){
			return{
				isActive:true,
				showQR:true,
				//用户名
				username:'',
				//检查注册用户名
				showUser1:false,
				//检查登录用户名
				showUser2:false,
				//密码
				password:'',
				showPassword:false,
				enterState:'login'
			}
		},
		created(){
			var lett = this;
			document.onkeydown = function(e) {
			var key = window.event.keyCode;
				if (key == 13) {
				lett.enterLogin();
				}
			}
		},
		methods:{
			//enter事件
			enterLogin(){
				if(this.enterState == 'login'){
					this.login()
				}else if(this.enterState == 'register'){
					this.register()
				}
			},
			loginLeft(){
				this.isActive = true;
				this.$store.commit("saveImg","")
			     this.username = "";
				 this.password = "";
				 this.showUser1 = false;
				 this.enterState = "login"
			},
			loginRight(){
				this.isActive = false;
				this.username = "";
				this.password = "";
				this.showUser2 = false;
				this.showUser1 = false;
				 this.enterState = "register"
			},
			//切换登录注册
			changeLogin(){
				this.showQR = !this.showQR;
			},
			//查询账户是否存在
			checkname(){
				let _this = this;
				let obj = {
					username:this.username
				}
				this.$ajax1.post("/checkname",obj)
				.then(res => {
					if(res.data.data.data == "exist"){
						_this.showUser1 = true;
						_this.showUser2 = false
					   return;
					}else{
						_this.showUser1 = false;
						_this.showUser2 = true
					}
					console.log(_this.showUser1)
				})
				.catch((err) => {
					console.log(err)
				})
			},
			//注册账户
			register(){
				console.log(this.username,this.password)
				if(!this.username){
					this.$Message.error('填写用户名');
					return;
				}
				if(!this.password){
					this.$Message.error('填写密码');
					return;
				}
				if(!this.$store.state.img){
					this.$Message.error('请上传头像');
					return;
				}
				let _this = this;
				let obj = {
					username:this.username,
					password:this.password,
					img:_this.$store.state.img
				}
				this.$ajax1.post('/register',obj).then(res => {
					if(res.data.data.errcode == 0){
						 _this.$Modal.success({
								title: "注册成功,请登录"
						});
						_this.enterState = "login"
						_this.$store.commit("saveImg","")
						}else if(res.data.data.errcode == 3){
							_this.$Modal.error({
								title: "用户名已存在"
							});
							return
						}
					_this.isActive = true;
					_this.username = "";
					_this.password = "";
					_this.showUser1 = false;
					_this.showUser2 = false;
				}).catch(err => {
					console.log(err)
				})
			},
			//登录账号
			login(){
				if(!this.showUser1){
					this.$Message.error('用户名不存在');
					return
				}
				if(!this.username){
					this.$Message.error('填写用户名');
					return;
				}
				if(!this.password){
					this.$Message.error('填写密码');
					return;
				}
				console.log(this.username,this.password)
				let _this = this;
				let obj = {
					username:this.username,
					password:this.password
				}
				this.$ajax1.post('/login',obj).then(res => {
					if(res.data.data.data.id){
						_this.isActive = true;
						_this.username = "";
						_this.password = "";
						_this.showUser1 = false;
						let obj = {
							username:res.data.data.data.username,
							userid:res.data.data.data.id,
						}
						_this.$store.commit('saveUser',obj)
						document.onkeydown = null;
						_this.$store.commit('saveImg',res.data.data.data.img)
						_this.$router.push({
							name:'home'
						})
					}else{
						_this.$Modal.error({
							title: "登录失败,用户名或密码错误"
						});
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		components:{
			uploadImg
		}
	}
</script>
<style scoped="scoped">
	* {
		margin: 0px;
		padding: 0px;
		text-decoration: none;
		list-style: none;
		outline: none;
		box-sizing: border-box;
	}
	
	.body {
		background: url(../../static/img/beijing1.png) no-repeat;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-size: 100% 100%;
		position: absolute;
	}
	.err-box{
		box-sizing: border-box;
		padding-top: 7px;
	}
	.err-word{
		font-size: 12px;
		color: #FF7256;
	}
	.logo {
		height: 45px;
		margin: 20px 40px;
		font-size: 30px;
		color: white;
	}
	
	.img_l {
		position: fixed;
		width: 40%;
		top: 25%;
		left: 15%;
	}
	
	.body_count {
		width: 340px;
		position: fixed;
		top: 20%;
		left: 65%;
	}
	
	.body_count_top {
		width: 100%;
		text-align: center;
		color: white;
		font-size: 22px;
		font-weight: bold;
		letter-spacing: 8px;
	}
	
	.login_count {
		width: 340px;
		height: 380px;
		padding: 10px;
		background-color: white;
		border-radius: 10px;
		box-shadow: 0px 0px 15px #2aa2a3;
		margin-top: 20px;
	}
	
	.login_count_a {
		width: 100%;
	}
	
	.login_count_a_l {
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: flex-end;
	}
	
	.icon_e {
		height: 18px;
	}
	
	.login_a_l_t {
		color: white;
		font-size: 12px;
		padding: 3px;
		background: linear-gradient(to right, #26CBD6, #3EE1E2);
	}
	
	.triangle {
		float: left;
		width: 0;
		height: 0;
		border-width: 11px;
		border-style: solid;
		border-color: transparent #3EE1E2 transparent transparent;
		transform: rotate(180deg);
	}
	
	#all {
		width: 80%;
		margin: 50px auto 0px;
	}
	
	#option {
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-radius: 20px;
		border: 1px solid #ceffff;
	}
	
	#option li {
		float: left;
		text-align: center;
		width: 50%;
		/*background: white;*/
		height: 38px;
		cursor: pointer;
		color: #4f4f4f;
		font-size: 16px;
		border-radius: 20px;
		font-weight: bold;
	}
	
	#option li.active {
		background: linear-gradient(to left, #40E4E5, #28CCD6);
		color: white;
		border-radius: 20px;
	}
	
	#card li {
		height: 100%;
		display: none;
	}
	
	#card li.active {
		display: block;
	}
	
	.login_bot_count {
		width: 100%;
		border: 1px solid #34D8DE;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		padding: 3px;
		margin-top: 10px;
	}
	
	.login_bot_count>img {
		height: 20px;
		padding-left: 5px;
	}
	
	.login_bot_count>input {
		height: 35px;
		border: 0px;
		width: 80%;
	}
	
	.login_bot_count>input::-webkit-input-placeholder {
		color: #dedede;
	}
	
	.login_bot {
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.login_bot>a,
	.login_bot>p {
		font-size: 12px;
		color: #898989;
	}
	
	.login_bot>p {
		width: 26%;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
	}
	
	
	/*记住密码勾选框*/
	
	.login_bot>p>input[type="checkbox"] {
		width: 10px;
		height: 10px;
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		line-height: 10px;
		position: relative;
	}
	
	.login_bot>p>input[type="checkbox"]::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		background: #fff;
		width: 100%;
		height: 100%;
		border: 1px solid #dedede;
	}
	
	.login_bot>p>input[type="checkbox"]:checked::before {
		content: "\2713";
		background-color: white;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		border: 1px solid #dedede;
		color: #898989;
		font-size: 12px;
		font-weight: bold;
	}
	
	
	/*按钮样式*/
	
	.login_button {
		margin-top: 7px;
		width: 100%;
		border: 0px;
		height: 35px;
		font-size: 16px;
		color: white;
		background: linear-gradient(to left, #40E4E5, #28CCD6);
	}
	
	.login_account_count {
		width: 100%;
		border: 1px solid #34D8DE;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		padding: 3px;
		margin-top: 10px;
	}
	
	.login_account_count>img {
		height: 20px;
		padding-left: 5px;
	}
	
	.mobile_input {
		height: 35px;
		border: 0px;
		width: 75%;
	}
	
	.account_select {
		color: #4F4F4F;
		font-size: 14px;
		border: 0px;
		margin: 0px 5px;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		width: 45px;
		z-index: 999;
		background: none;
	}
	
	.account_select_icon {
		position: relative;
		left: -8%;
		height: 10px!important;
	}
	
	.login_account_counts {
		width: 100%;
		border: 1px solid #34D8DE;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		padding: 3px;
		margin-top: 10px;
	}
	
	.login_account_counts>img {
		height: 20px;
		padding-left: 5px;
	}
	
	.login_account_counts>input:nth-of-type(1){
		height: 35px;
		border: 0px;
		width: 50%;
	}
	
	.account_code {
		color: white;
		background-color: #26CBD6;
		padding: 5px;
		font-size: 12px;
		cursor: pointer;
		border: 0px;
	}
	
	.login_account_count>input::-webkit-input-placeholder {
		color: #dedede;
	}
	
	.login_account_counts>input::-webkit-input-placeholder {
		color: #dedede;
	}
	
	
	/*按钮样式*/
	
	.login_account_button {
		margin-top: 7px;
		width: 100%;
		border: 0px;
		height: 35px;
		font-size: 16px;
		color: white;
		background: linear-gradient(to left, #40E4E5, #28CCD6);
	}
	
	.login_count_b {
		width: 100%;
	}
	
	.login_count_b_l {
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: flex-end;
	}
	
	.icon_e,
	.icon_z {
		height: 18px;
	}
	
	.login_b_l_t {
		color: white;
		font-size: 12px;
		padding: 3px;
		background: linear-gradient(to right, #26CBD6, #3EE1E2);
	}
	
	.login_b_title>img {
		height: 22px;
		margin-right: 5px;
	}
	
	.login_b_title {
		width: 100%;
		margin-top: 30px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: black;
		font-size: 16px;
		font-weight: 1000;
	}
	
	.libqr {
		width: 60%;
		margin: 10px 20%;
	}
	
	.libqr_text {
		width: 100%;
		text-align: center;
		color: #c4c4c4;
		font-size: 12px;
	}
	.delivery_count_l_b>input:focus .delivery_count_l_b{
		border-bottom: 1px solid #26CAD6;
	}

</style>
