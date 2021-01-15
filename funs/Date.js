/**
 *Date.js
 *导入方式：var Date = require("./Date.js"); var Date = new Date();
 */


//格式化函数
 function dateFormat(date, fmt) {
	        if (null == date || undefined == date) return '';
	        var o = {
	            "M+": date.getMonth() + 1, //月份
	            "d+": date.getDate(), //日
	            "h+": date.getHours(), //小时
	            "m+": date.getMinutes(), //分
	            "s+": date.getSeconds(), //秒
	            "S": date.getMilliseconds() //毫秒
	        };
	        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	        for (var k in o)
	            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        return fmt;
	    }

//date格式化属性
	Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "H+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
   }

	
//date 数据格式JSON化自动格式化'yyyy-MM-dd'
    Date.prototype.toJSON = function () { return this.Format('yyyy-MM-dd')}
    
    //另一种写法 return dateFormat(this,'yyyy-MM-dd')

