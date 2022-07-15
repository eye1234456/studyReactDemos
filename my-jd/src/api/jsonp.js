/**
 * JSONP操作
 * @param url : 请求的url
 * @param data : 发送数据
 * @param jsonpcallback : 服务器给出的JSONP端口的API名称
 * @param callback : 执行JSONP获取数据的回调函数
 */
const jsonp = function jsonp(url, data, jsonpcallback, callback) {

    // 每次请求构建一个回调函数
    var cbName = 'cb' + jsonp.count++;
    var callbackName = 'window.jsonp.' + cbName;
    // 构建script用于请求
    let script = document.createElement('script');
    window.jsonp[cbName] = function (jsonpData) {
        try {
            // 执行回调
            callback && callback(jsonpData);
        } finally {
            // 请求完成后删除script
            script.parentNode.removeChild(script);
            // 删掉请求的回调函数
            delete window.jsonp[cbName];
        }
    };

    // 将参数进行uri编码
    if (data) {
        data = tool.encodeToURIString(data);
    }
    if (typeof jsonpcallback === 'string') {
        var jsonpData = jsonpcallback + '=' + callbackName;
    }
    url = tool.hasSearch(url, data);
    url = tool.hasSearch(url, jsonpData);
    // 使用script方式发送请求，可以处理跨域请求的问题
    // http://localhost:3000/data/more?callback=window.jsonp.cb8
    script.src = url;
    document.body.appendChild(script);
};
jsonp.count = 0;
window.jsonp = jsonp;
/**
 * 工具类
 */
const tool = {
    /**
     * 
     * @param {*} data 
     * @returns 
     */
    encodeToURIString: function (data) {
        if (!data) return '';
        if (typeof data === 'string') return data;
        var arr = [];
        for (var n in data) {
            if (!data.hasOwnProperty(n)) continue;
            arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
        }
        return arr.join('&');
    },
    hasSearch: function (url, padString) {
        if (!padString) return url;
        if (typeof padString !== 'string') return url;
        return url + (/\?/.test(url) ? '&' : '?') + padString;
    }
}

export default jsonp;
/**
 * promise请求
 */
export const jsonpClient = {
    get: async (api, data) => {
        return new Promise((resolve, reject) => {
            jsonp(api, data, 'callback', (data) => {
                resolve(data);
            });
        });
    }
};