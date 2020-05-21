<template>
    <div class="box">
		<div class="demo-upload-list" v-show="$store.state.img">
		    <template >
		        <img :src="$store.state.img">
		        <div class="demo-upload-list-cover">
		            <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
		            <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
		        </div>
		    </template>
		</div>
		<Upload
		    ref="upload"
		    :on-success="handleSuccess"
		    :format="['jpg','jpeg','png']"
		    :max-size="2048"
		    :before-upload="handleBeforeUpload"
		    multiple
		    type="drag"
		    action="http://39.105.146.1:3000/uploadImg"
		    style="display: inline-block;width:58px;height: 58px;overflow: hidden;">
		    <div style="width:58px;height:58px;line-height: 58px;">
		        <Icon type="ios-camera" size="20"></Icon>
		    </div>
		</Upload>
		<Modal title="头像" v-model="visible">
		    <img :src="$store.state.img" v-if="visible" style="width: 100%">
		</Modal>
	</div>
</template>
<script>
    export default {
        data () {
            return {
				showImg:false,
                visible: false,
				imgObj:{
					name:'图片',
					url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589994069658&di=11ba80b16f061b5d0216a97699cbc140&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201511%2F08%2F20151108215853_iLzZB.jpeg'
				}
            }
        },
        methods: {
            handleView (name) {
                this.visible = true;
            },
            handleRemove (file) {
				this.$store.commit('saveImg',"")
				this.showImg = false
            },
            handleSuccess (res, file) {
				console.log(res.data.data)
				this.$store.commit('saveImg',res.data.data)
                file.name = '头像';
				this.showImg = true
				console.log("666")
            },
            handleBeforeUpload () {
				console.log("上传前")
            }
        },
        mounted () {
        }
    }
</script>
<style scoped="scoped">
	.box{
		display: flex;
		justify-content: center;
		margin: 15px auto;
	}
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
