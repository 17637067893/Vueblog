import axios from 'axios';
import qs from 'qs';

const SUCCESS_CODE = 200;
const SUCCESS_CODE_DATA = 0;
axios.defaults.withCredentials=true
axios.defaults.baseURL = 'http://localhost:3000';
function post (url = ``, data = {}, opts = {}) {
    const defaultOptions = {
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    };
    const options = {
        ...defaultOptions,
        ...opts,
        ...{method: 'POST'}
    };
	console.log(url,options)
    return axios(url, options).then(response => {
        if (+response.data.code === SUCCESS_CODE && +response.data.data.errcode === SUCCESS_CODE_DATA) {
             console.log(1)
			return response.data;
        } else {
			console.log(2)
            throw response.data;
        }
    }).catch(err => {
		console.log(err)
	});
}

function get (url = ``, data = {}, opts = {}) {
    const defaultOptions = {
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };
    const options = {
        ...defaultOptions,
        data: qs.stringify(data),
        ...opts,
        ...{method: 'GET'}
    };
    return axios(url, options).then(response => {
        if (+response.data.code === SUCCESS_CODE && +response.data.data.errcode === SUCCESS_CODE_DATA) {
            return response.data;
        } else {
            throw response.data;
        }
    });
}

export default {get, post};
