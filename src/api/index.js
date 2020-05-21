import httpRequests from '@/utils/http';


let obj ={
	// 新增文章
	addArticle:(url,data) => {
		return  httpRequests.get(url,data);
	},
	//上传封面
	uploadImg:(url,data) => {
		return  httpRequests.get(url,data);
	},
	// 获取文章列表
	getList:(url,data) => {
		return  httpRequests.get(url,data);
	},
	//新增文章
	add:(url,data) => {
		return httpRequests.post(url,data);
	},
	//注册账户
	//新增文章
	addCount:(url,data) => {
		return httpRequests.post(url,data);
	}
}			
export default obj