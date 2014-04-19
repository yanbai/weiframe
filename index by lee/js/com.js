// JavaScript Document
function Extend(tgt,src){for(var i in src){tgt[i]=src[i]}return tgt};
Array.prototype.has = function(e){for(var i in this){if(this[i]===e)return true;}return false};
Array.prototype.each = function(fn){for(var i=0,l=this.length;i<l;i++)fn.call(this[i],i)};
Array.prototype.merge=function(arr){for(var i=0,l=arr.length;i<l;i++)this[this.length]=arr[i];return this};
String.prototype.isPhoneNum=function(){if(this == '')return false;var reg =/^(((0[1-2]\d)|(0[3-9]\d{2}))-\d{7,8})?$/; return this.match(reg) ? true : false}
String.prototype.isAllChinese=function(){if(this == '')return false;var reg =/^([^\u0000-\u00FF]+)$/; return this.match(reg) ? true : false}
String.prototype.isAllNumber=function(){if(this == '')return false;var reg =/^(\d+)$/; return this.match(reg) ? true : false}
String.prototype.isWebSite=function(){if(this == '')return false;var reg =/^(www.)(\w)+.[a-zA-Z]{2,3}$/; return this.match(reg) ? true : false}
String.prototype.isEmail=function(){if(this == '')return false;var reg =/^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/; return this.match(reg) ? true : false}
String.prototype.isMobil=function(){if(this == '')return false;var reg =/^(13[0-9]|15[0|1|3|6|7|8|9]|18[0|6|7|8|9])\d{8}$/; return this.match(reg) ? true : false}
String.prototype.isPic=function(){if(this == '')return false;var reg =/(.bmp|.jpg|.jpeg|.png|.gif)$/i; return this.match(reg) ? true : false}
String.prototype.isMoney=function(){if(this == '')return false;var reg =/^(\d+)(万)?$/; return this.match(reg) ? true : false}
Extend(String.prototype,{
	ltrim:function(){return this.replace(/^\s+/,'')},rtrim:function(){return this.replace(/\s+$/,'')},trim:function(){return this.replace(/^\s+|\s+$/g,'')}
});
function G(a){return typeof a==='string'?document.getElementById(a):a};
$.isIE=document.all?true:false;
var com=function(){
	this._version='1.1';
	this.js=[];
	this.rjs=/<script.*?(?:src="([^"]*)")?>([\w\W]*?)<\/script>/gi;
};com.prototype={
	loadJs:function(src,callback){
		src=src+'?version='+this._version+Math.random();
		if(!this.js.has(src)){
			this.js.push(src);
			var e=document.createElement('script');e.src=src;e.type='text/javascript';
			if(typeof callback==='function')$.isIE?e.onreadystatechange=function(){(!this.readyState||this.readyState=='loaded'||this.readyState=='complete')&&callback()}:e.onload=callback;
			$('head')[0].appendChild(e);
		}else typeof callback==='function'&&callback();
	},
	eval:function(d){d=''+d;if(d=='')return;(window.execScript||function(x){window.eval.call(window,x)})(d);},
	ExeScript:function(x){
		this.rjs.lastIndex=0;var v=[[],''];while(this.rjs.exec(x)){
		/*alert(RegExp.$1+"\n"+RegExp.$2);*/
		RegExp.$1!=''&&v[0].push(RegExp.$1);RegExp.$2!=''&&(v[1]+=RegExp.$2+';');}return v
	},
	DP:function(){
		var t=this;$.DP==undefined?t.loadJs('js/adm/date.js',function(){t.DatePicker(t._self)}):t.DatePicker(t._self)},
	//日期选择器
	DatePicker:function(o){
		var pos=$(o).offset();
		new $.DP({target:o,from:[2011,1,1],to:[2020,12,30],index:'input'});
		$('#calendar').css({left:pos.left+'px',top:(pos.top+o.offsetHeight)+'px',display:'block'});
		$Evt.push(G('calendar'));
	},
	DP1:function(){
		var t=this;$.DP==undefined?t.loadJs('js/adm/date.js',function(){t.DatePicker1(t._self)}):t.DatePicker1(t._self)},
	//日期选择器
	DatePicker1:function(o){
		var pos=$(o).offset();
		new $.DP({target:o,from:[2011,1,1],to:[2020,12,30],index:'input',
		callback:function(date){
			$(this.box).hide();
			$(o).parent().text(date);
		}
		});
		$('#calendar').css({left:pos.left+'px',top:(pos.top+o.offsetHeight)+'px',display:'block'});
		$Evt.push(G('calendar'));
	},
	
	
	
	select:function(input){
		var el=this._target;
		if(el==this._self)return;
		if(el.tagName.toLowerCase()=='a'){var self=el;el=el.parentNode}
		if(el.tagName.toLowerCase()=='b'){
			var ext=$(el).next()[0];
			if(ext.style.display=='block'){
				ext.style.display='none';
			}else{
				ext.style.display='block';$Evt.push(ext);
			}
		}else{
			var span_b=$(self.parentNode).prev()[0];
			span_b.innerHTML='';
			span_b.appendChild(self.cloneNode(true));
			self.parentNode.style.display='none';
			if(input)G(input).value=self.rel;
			var chDo=this._self.getAttribute('onchange');
			if(chDo)this.eval(chDo);
		}
	},
	xtip:function(x){
		alert(x);
	},
	EvtStop:function(){},
	dateInput:function(a,b){
		$('#'+a).text(b.value);
	}
};com=new com;

/*--------------事件处理机制----------------*/
var $Evt=function(){
	var t=this;
	t.tipBox=[];
	t.rule={mouseover:/o[\d]-([^\s]*)/g,click:/e[\d]-([^\s]*)/g,mousedown:/d[\d]-([^\s]*)/g,mouseout:/u[\d]-([^\s]*)/g};
	document.onclick = function(e){e=e||window.event;t.finder(e.target||e.srcElement,e,t.rule.click)};
	document.onmousedown = function(e){e=e||window.event;t.finder(e.target||e.srcElement,e,t.rule.mousedown)};
//	document.onmouseover = function(e){e=e||window.event;t.finder(e.target||e.srcElement,e,t.rule.mouseover)};
//	document.onmouseout = function(e){e=e||window.event;t.finder(e.target||e.srcElement,e,t.rule.mouseout)};
	t.EvtBubble={
		//(class="ea-class-func")[禁止冒泡]
		1:function(){return true},
		//(class="eb-class-func")[阻止返回默认值]
		2:function(e){$.isIE?e.returnValue=false:e.preventDefault();return false},
		//(class="ec-class-func")[禁止冒泡并阻止返回默认值]
		3:function(e){$.isIE?e.returnValue=false:e.preventDefault();return true;}
	};
};
$Evt.prototype={
	finder:function(target,event,rule){
		var FuncList=[];
		var c,el=target,isStop=false;
		while(el.tagName.toLowerCase()!='html'){
			if(c=el.className.match(rule)){
				for(var i=0,l=c.length;i<1;i++){
					var a=c[i].replace(/[eod]([\d])-/,'').split('-');
					var sign=RegExp.$1;
					var cls=a[0],fn=a[1];
					var cname=window[cls];
					if(cname==undefined)return;
					var func=cname[fn];
					if(typeof func==='function'){
						FuncList.push(function(_el){
							return function(){
								cname._event=event;//当前事件event
								cname._target=target;//触发事件的标签
								cname._self=_el;//设置事件的标签
								func.apply(cname,a.slice(2));
							}
						}(el));
					}else alert('undefined:'+cls+'.'+fn);
					if(this.EvtBubble[sign]!=undefined)isStop=this.EvtBubble[sign](event);
				}
				if(isStop)break;else el=el.parentNode;
			}else el=el.parentNode;
		}
		if(!isStop && event.type=='click')this.clear();
		FuncList.each(function(){this()});
	},
	clear:function(){for(var i=0,l=this.tipBox.length;i<l;i++)this.tipBox[i].style.display='none';this.tipBox=[]},
	push:function(el){el=G(el);if(!el)return;if(!this.tipBox.has(el))this.tipBox.push(el)}
};$Evt=new $Evt;

/*--------------End----------------*/
/*Ajax请求封装*/
var $request=function(o){
	//请求loading开始
	//G('tips').style.display='block';
	var params={url:'index.php',type:'post'};
	$.extend(params,o);
	params.success=function(x){
		var _Js_=com.ExeScript(x);
		o.success!=undefined&&o.success(x.replace(com.rjs,''));
		_Js_[0].each(function(){$.loadJs(this)});
		com.eval(_Js_[1]);
		//请求结束执行
		//G('tips').style.display='none';
		//$end();
		//noLog&&$_C.push(params);
	};
	$.ajax(params);
};

/*弹出层*/
var popUp=function(){};
popUp.prototype={
	init:function(size){
		if(document.getElementById('tanchuan_'+size)){return false;}
		$('body').append('<iframe class="overlay" frameborder="0" scrolling="no"></iframe>\
		<div class="overlay2"></div><div id="tanchuan_'+size+'">\
		<table><tr><td>\
		<div class="tit"><span></span></div>\
		<div class="txt"></div>\
		</td></tr></table>\
		</div>')
	},
	//大弹出层（自适应）
	alert_big:function(content,title,options){
		this.init('big');
		var o={close:1};
		if(options!=undefined&&options.close!=undefined){$.extend(o,options);}
		this.title=title;this.content=content;
		var $tanchuan=$('#tanchuan_big');
		
		$tanchuan.find('.tit').find('span').html(title+'<div class="close" onclick="popup.hide(&quot;tanchuan_big&quot;)"><span>x</span></div>');
		$tanchuan.find('.txt').html(content);
		o.close==1 ? $tanchuan.find('.close').show() : $tanchuan.find('.close').hide();
		$('.overlay').css({opacity:0});
		$('.overlay2').css({opacity:0.5});
		this.dark(this.show('big'));
		if(options!=undefined&&options.callback!=undefined&&typeof(options.callback)=='function')options.callback.apply(this,options.params);
	},
	//小弹出层
	alert_small : function(content,title,options){
		this.init('small');
		var o={close:1};
		if(options!=undefined&&options.close!=undefined){$.extend(o,options);}
		this.title=title;this.content=content;
		var $tanchuan=$('#tanchuan_small');
		$tanchuan.find('.tit').find('span').html(title+'<div class="close" onclick="popup.hide(&quot;tanchuan_small&quot;)"><span>x</span></div>');
		$tanchuan.find('.txt').html(content);
		o.close==1 ? $tanchuan.find('.close').show() : $tanchuan.find('.close').hide();
		$('.overlay').css({opacity:0});
		$('.overlay2').css({opacity:0.5});
		this.dark(this.show('small'));
		if(options!=undefined&&options.callback!=undefined&&typeof(options.callback)=='function')options.callback.apply(this,options.params);
	},
	//第二级弹出层
	pop_small : function(content,title,divId){
		var o={close:1};
		(arguments[3]!=undefined)&&$.extend(o,arguments[2]);
		this.title=title;this.content=content;
		if(document.getElementById(divId)){
			$('#'+divId).append('<div id="wei_pop"><div class="tit"><span></span></div><div class="txt"></div></div>');
			var $tanchuan=$('#wei_pop');
			$tanchuan.find('.tit').find('span').html(title+'<div class="close" onclick="popup.hide(&quot;'+divId+'&quot;)"><span>x</span></div>');
			$tanchuan.find('.txt').html(content);
			o.close==1 ? $tanchuan.find('.close').show() : $tanchuan.find('.close').hide();
			$tanchuan.fadeIn('fast')
		}else return false;
	},
	show:function(size){
		var windowHeight=document.documentElement.clientHeight>document.documentElement.scrollHeight?document.documentElement.clientHeight:document.documentElement.scrollHeight;
		var scrollTop=document.documentElement.scrollTop;
		switch(size){
			case 'big' : 
				var _w = $('#tanchuan_'+size).width()/2; 
				var _h = $('#tanchuan_'+size).height()/2;
				$('#tanchuan_'+size).css({left:'50%',top:'50%',marginLeft:-_w,marginTop:-_h}).show();
				break;
			case 'small' : 
				$('#tanchuan_'+size).css({left:'50%',top:'50%',marginLeft:-196,marginTop:-121}).show();
				break;
			case 'middle' : 
				$('#tanchuan_'+size).css({left:'50%',top:'50%',marginLeft:-232,marginTop:-121}).show();
				break;
		}
	},
	hide:function(id){
		$('#'+id).remove();$('.overlay2').remove();$('.overlay').remove();
	},
	dark:function(callback){
		$('#iebug_iframe').show();
		$('.overlay').fadeIn(50,function(){});
		$('.overlay2').fadeIn(50,function(){callback});
	},
	alert_type1:function(){
		popup.alert_small('<div id="alert_type1"><p>确定删除该条件吗？</p><p><a href="#"><span>确定</span></a></p></div>','修改条件');
	}
};
var popup=new popUp();
//工具函数
var myFun = function(){}
myFun.prototype = {
	getId : function(id){
          if(id) return document.getElementById(id);
        },
	stop : function(e){
		if (e && e.stopPropagation)
            e.stopPropagation()
            else{
                window.event.cancelBubble=true
        }
	},
	getClassName : function(className,ele,tagName){
		var arr=[];
		var eles=null;
		if(ele) {
			ele = this.getId(ele);
			if(tagName)
				eles=ele.getElementsByTagName(tagName)
			else
				eles=ele.getElementsByTagName('*')
		}else
			eles=document.getElementsByTagName('*');
			
		for(var i=0;i<eles.length;i++){
			if(eles[i].className.search(new RegExp("\\b" + className + "\\b"))!=-1){
				arr.push(eles.item(i))
			}
		}
		return arr;
	},
	hasClass : function(element, className){
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    	return element.className.match(reg);
	},
	addClass : function(elem,value,e){
		if(e){this.stop(e)}
		 if(!elem.className){
	        elem.className=value;
	    }else{
	        var oValue=elem.className;
	        oValue+=" ";
	        oValue+=value;
	        elem.className=oValue;
    	}
	},
	removeClass : function(element, className,e){
		if(e){this.stop(e)}
		if (this.hasClass(element, className)) {
	        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	        element.className = element.className.replace(reg, '');
	    }
	},
    getPreNode : function(node){
        do{
            node = node.previousSibling;
        }while(node && node.nodeType!=1)
        return node;
    },
    index: function(current,obj){
        for (var i = 0; i < obj.length; i++) {
            if (obj[i] == current) {
                return i;
            }
        }
    },
    getParent : function(c,t){
        while(c.tagName.toLowerCase()!=t){
            c = c.parentNode;
         }
        return c;
    },
    getTagName : function(p,c){
        return p.getElementsByTagName(c);
    },
    //找子节点
    getChild : function(ele,tagName){
		if(!(ele && ele.nodeType && ele.nodeType === 1))
			return false
		var child = ele.firstChild;
		//从第一个节点开始判断
		var arr = []
		if(tagName) {
			while(child) {
				if(child.nodeType == 1 && child.tagName.toLowerCase() == tagName.toLowerCase()) {
					arr.push(child);
				}
				child = child.nextSibling;
			}
		} else {
			while(child) {
				if(child.nodeType == 1) {
					arr.push(child);
				}
				child = child.nextSibling;
			}
		}
		return arr
    }
}
var funTool = new myFun();
