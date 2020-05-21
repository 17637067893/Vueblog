<template>
	<div class="container">
		<div class="top">
			 <Input style="width: 40vw;" v-model="info.title" size="large" placeholder="请输入文章标题" />
			 <div>
				 <Button @click="goBack" class="btn" size="large" type="primary">返回</Button>
			 </div>
		</div>
		<div class="imgContanier">
			<div v-if="info.img">
				<img class="img-box" :src="info.img" alt="封面">
			</div>
			<Upload
				ref="upload"
				:show-upload-list="false"
				:on-success="handleSuccess"
				:format="['jpg','jpeg','png']"
				:max-size="2048"
				:before-upload="handleBeforeUpload"
				multiple
				type="drag"
				action="http://39.105.146.1:3000/uploadImg"
				style="display: inline-block;width:200px;height: 126px;margin-bottom: 16px;">
				<div style="width: 200px;height:125px;line-height: 140px;">
					<Icon type="ios-camera" size="60"></Icon>
				</div>
			</Upload>
		</div>
		<div id="editor">
			<div class="editor-box"  ref="editorElem"></div>
		</div>
		<div class="btn-box">
			<Button @click="save(0)" size="large" icon="ios-calendar-outline" type="primary">保存</Button>
			<Button @click="save(1)" size="large" icon="ios-jet-outline" type="primary">发表</Button>
		</div>
	</div>
</template>
<script>
	import E from "wangeditor";
	export default{
		data(){
			return{
				editor: null,
				info:{
					content: '',
					title:'',
					img:'',
				}
			}
		},
		created(){
			if(this.$route.query.item){
				this.info = this.$route.query.item
			}
			console.log(this.$route.query.item)
		},
		methods:{
		    save(param){
				let _this = this;
				if(!this.info.title){
				 	this.$Message.error("请输入标题");
				      return;
				 }
				 if(!this.info.img){
				 	this.$Message.error("请选择图片");
				 	  return;
				 }
				if(this.editor.txt.html() == "<p><br></p>" || this.editor.txt.html() == ""){
					this.$Message.error("请输入内容");
					return;
				}
				
				console.log(this.editor.txt.html())
				let data={
					title:this.info.title,
					content:this.editor.txt.html(),
					img:this.info.img,
					status:param,
					userid:this.$store.state.userid
				}
				let msg
				if(param == 1){
					msg='文章发表成功'
				}else{
					msg='文章新增成功'
				}
				this.$ajax1.post('/add',data)
				  .then(function (response) {
					  if(response.data.code == 200){
						  _this.$Message.success(msg);
						  _this.info.title = "";
						  _this.info.img = "";
						  _this.editor.txt.html('<p><br></p>');
					  }
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			},
			// 上传成功
			handleSuccess(res,file){
				this.info.img =res.data.data; 
				console.log(this.info.img)
			},
			handleBeforeUpload(res){
				console.log(res);
			},
			goBack(){
				console.log("66")
				this.$router.go(-2);
			}
		},
		mounted(){
			this.editor = new E(this.$refs.editorElem);
			// 每次改动获取值
			this.editor.customConfig.onchange = html => {
				  this.info.content = html;
				  console.log(html)
			};
			 this.editor.customConfig.menus = [
			      // 菜单配置
			      'head', // 标题
			      'bold', // 粗体
			      'fontSize', // 字号
			      'fontName', // 字体
			      'italic', // 斜体
			      'underline', // 下划线
			      'strikeThrough', // 删除线
			      'foreColor', // 文字颜色fp			      'backColor', // 背景颜色
			      'link', // 插入链接
			      'list', // 列表
			      'justify', // 对齐方式
			      'quote', // 引用
			      'emoticon', // 表情
			      'image', // 插入图片
			      'table', // 表格
			      'code', // 插入代码
			      'undo', // 撤销
			      'redo' // 重复
			    ];
			    this.editor.create(); // 创建富文本实例
				 this.editor.txt.html(this.info.content);
				 console.log(this.info.content)
		},
		beforeUpdate(){
			// this.editor.txt.html(this.info.content);
		}
	}
</script>
<style scoped="scoped">
	.container{
		margin: 20px 10vw;
	}
	.editor-box>.w-e-text-container{
		height:700px !important;
		background-color: #FFF !important;
	}
	.w-e-text{
		height:  700px !important;
		background-color: #FFF !important;
	}
	.btn-box{
		display: flex;
		justify-content: space-around;
		margin-top: 24px;
	}
	.imgContanier{
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}
	.fileLabel{
		  display: inline-block;
		  width:180px;
		  height: 40px;
		  line-height: 40px;
		  text-align: center;
		  border: 1px solid #57a3f3;
		  border-radius: 5px;
		  background: #57a3f3;
		  cursor: pointer;
		  color: white;
		}
		.fileInput{display: none;}
		.img-box{
			width: auto;
			height: 130px;
			object-fit: cover;
			border-radius: 5%;
			margin: 10px 20px;
		}
		.top{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 1vw 0;
			width: 100%;
			overflow: hidden;
		}
</style>
