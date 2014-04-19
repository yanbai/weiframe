// JavaScript Document
var $$e = true;
//var $Evt = [];
var Animate=(function(){
	return {
		//评论数据加载
		ajComment:function(slideEleId,weiboId){
		     var commentId='e0-Animate-ajComment-commentBox-'+weiboId;
                 var _url='/microblog/comments/'+weiboId;
                 $.get(
                       _url,
                       function(data){
                           $('#comment_mainer_'+weiboId).html(data);
						   //评论--回复
							$('.copy_now').click(function(){
								var box=$(this).parent().siblings('.reply_box');
								box.show();
								$(this).parents('.comment_info').siblings().find('.reply_box').hide();
								var commenter=$(this).parent().siblings('.comment_content').find('.commenter').text();
								box.find('.txt_box').val('回复 @'+commenter+'：');
							});
                        }
                  );                      
			$('#'+slideEleId).slideDown();
			$Evt.push(G(slideEleId));
			$$e=false;
		},
		slideDown:function(slideEleId){
			$('#'+slideEleId).slideDown();
			$Evt.push(G(slideEleId));
			$$e=false;
		},
		changeSize:function(){
			if(this._target.src.match('thumbnail')){
				var s1 = this._target.src;
				var s2 = this._target.src.replace(/thumbnail/,'bmiddle');
				this._target.src=s2;
				$(this._target).removeClass('bigcursor').addClass('smallcursor')
			}else if(this._target.src.match('bmiddle')){
				var s1 = this._target.src;
				var s2 = this._target.src.replace(/bmiddle/,'thumbnail');
				this._target.src=s2;
				$(this._target).removeClass('smallcursor').addClass('bigcursor')
			}
		},
		toggleFilter:function(type){
			var li=G(type+'FilterLi');
			var candidate=G(type+'Candidate');

			if(candidate.style.display == 'none'){
				//$(candidate).slideDown('fast');
				$(candidate).show();
				li.className='current';
			}else{
				$(candidate).hide();
				//$(candidate).slideUp('fast');
				li.className='';
			}
			$Evt.push(candidate);
			$$e=false;
		},
		setFilter:function(type){
			var filter=G(type+'Filter');
			var li=G(type+'FilterLi');
			var value=this._target.innerHTML;
			var flag = this._target.getAttribute('flag');
			if(flag!='undefind'){
				G(type+'Hidden').value = flag;
			}else{
				G(type+'Hidden').value = value;
			}
			filter.innerHTML = value;
			li.className='';
		},
		//栏目分类删除 修改 保存
		modifyNav : function(id){
			this._target.className = 'save e0-Animate-saveNav-'+id;
			this._target.innerHTML = '保存';
			var li = funTool.getParent(this._target,'li');
	        var span = funTool.getTagName(li,'span');
			var prev = span[0];
			var value = prev.innerHTML;
			prev.innerHTML = '<input type="text" class="text_css3 column_txt" value="'+value + '">';
		},
		saveNav : function(id){
			this._target.className = 'e0-Animate-modifyNav-'+id;
			this._target.innerHTML = '修改';
			var li = funTool.getParent(this._target,'li');
	        var span = funTool.getTagName(li,'span');
			var prev = span[0].getElementsByTagName('input');
			var value = prev[0].value;
			//span[0].innerHTML = value;
			
		//保存修改的栏目分类	
			var D={id:id,columnName:value};
			$.ajax({url:'weibo/updateColumn',type:'post',data:D,success:function(x){
				if(x == 1){
					alert('保存成功');
					location.reload();
				}else if(x == 'exists'){
					alert('该分类已经存在');
					location.reload();
				}else if(x == 'limit'){
					alert('对比起，超过最多分类上限');
				}else{
					alert('保存失败');
					//location.reload();
				}
			}});
		},
		delNav : function(id){
			//也可调用funTool方法
			var li = this._target.parentNode.parentNode;
			var ul = this._target.parentNode.parentNode.parentNode;
			//动态添加无内容删除
			if(li.getAttribute('data')=='new'){
				ul.removeChild(li);
				return;
			}
			if(confirm('确定要删除该分类？')){
				ul.removeChild(li);	
				//删除栏目分类
				var D = {id:id};
				$.ajax({url:'weibo/delColumn',type:'post',data:D,success:function(x){
					if(x)alert('删除成功');else alert('删除失败');
				}});
			}
		},
		//上移 下移
		downNav : function(){
			var li = funTool.getParent(this._target,'li');
			var con = li.innerHTML;
			var ul = funTool.getParent(this._target,'ul');
			var liTag = funTool.getTagName(ul,'li');
			var liIndex = funTool.index(li,liTag);
			if(liIndex+1 == liTag.length){
        		alert('已经是最后一个，无法再下移');
        		return;
        	}
        	
        	var nextCon = liTag[liIndex+1].innerHTML;
			liTag[liIndex].innerHTML = nextCon;
			liTag[liIndex+1].innerHTML = con;
        	
			var cid = liTag[liIndex].getAttribute('cid');
			var order = liTag[liIndex].getAttribute('order');
			var cidNext = liTag[liIndex+1].getAttribute('cid');
			var orderNext = liTag[liIndex+1].getAttribute('order');
			//对换orderid
			liTag[liIndex].setAttribute('cid',cidNext);
			liTag[liIndex+1].setAttribute('cid',cid);
        	
			
			//上移下移操作
			var D = {id:cid,order:order,id2:cidNext,order2:orderNext};
			$.ajax({url:'weibo/updateOrder',type:'post',data:D,success:function(x){
				
			}});
			
			
		},
		upNav : function(){
			var li = funTool.getParent(this._target,'li');
			var con = li.innerHTML;
			var ul = funTool.getParent(this._target,'ul');
			var liTag = funTool.getTagName(ul,'li');
			var liIndex = funTool.index(li,liTag);
			if(liIndex == 0){
        		alert('已经是第一个，无法再上移');
        		return;
        	}
        	var prevCon = liTag[liIndex-1].innerHTML;
			liTag[liIndex].innerHTML = prevCon;
			liTag[liIndex-1].innerHTML = con;
			
			var cid = liTag[liIndex].getAttribute('cid');
			var order = liTag[liIndex].getAttribute('order');
			var cidPrev = liTag[liIndex-1].getAttribute('cid');
			var orderPrev = liTag[liIndex-1].getAttribute('order');
			
			//console.log(cidPrev+';'+orderPrev)
			//对换orderid
			liTag[liIndex].setAttribute('cid',cidPrev);
			liTag[liIndex-1].setAttribute('cid',cid);	
			
			//console.log(liTag[liIndex].getAttribute('order'))
        	
			
			//上移下移操作
			var D = {id:cid,order:order,id2:cidPrev,order2:orderPrev};
			$.ajax({url:'weibo/updateOrder',type:'post',data:D,success:function(x){
				
			}});
			
		},
		//添加栏目
		addNav : function(){
			var obj = funTool.getId('navListZn');
			var li = document.createElement('li');
			li.setAttribute('data','new');
			li.innerHTML = '<span class="column_type_l"><input type="text" class="text_css3 column_txt"></span><span class="column_type_r"><a href="javascript:;" class="e1-Animate-upNav">上移</a> | <a href="javascript:;" class="e1-Animate-downNav">下移</a> | <a href="javascript:;" class="save e0-Animate-saveNav">保存</a> | <a href="javascript:;" class="e1-Animate-delNav">删除</a></span>';
			li.innerHTML = '<span class="column_type_l"><input type="text" class="text_css3 column_txt"></span><span class="column_type_r"><a href="javascript:;" class="save e0-Animate-saveNav">保存</a> | <a href="javascript:;" class="e1-Animate-delNav">删除</a></span>';
			obj.appendChild(li);
		},
		
		//转发微博
		transmit:function(data){
			if(data.comment==undefined){
				popup.alert_big('<div class="weibo_transmit">\
				<p class="pub_say">'+
				data.content    
				+'</p>\
				<div class="wei_transmit_select">\
					<ul class="select box">\
						<li id="typeFilterLi"><a href="javascript:void(0)" id="typeFilter" class="e0-Animate-toggleFilter-type">关键字</a>\
						  <div id="typeCandidate" class="option" style="display: none;">\
							<ul>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字1</a></li>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字2</a></li>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字3</a></li>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字4</a></li>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字5</a></li>\
							</ul>\
						  </div>\
						</li>\
					</ul>\
				</div>\
				<div class="sub_text_zn">\
					<textarea id="wei_transmit_text" placeholder="微博内容这里输入"></textarea>\
				</div>\
				<div class="wei_bottom_line"><span class="left">\
				<!--表情-->\
					<span class="sub_act_ico">\
						<i class="extMenu" title="表情"><b class="e1-weibo-addEmotion"></b><div class="subBox"></div></i>\
						<i class="extMenu" title="图片" onmouseover="$(this).addClass(\'imgHov\')" onmouseout="$(this).removeClass(\'imgHov\')"><b class="vi2"></b>\
						<em class="addImg"><input type="file" name="wbFile" onchange="weibo.addImg(this)" /></em><span class="wbEdtimgBox"></span></i>\
						<i class="extMenu" title="视频"><b class="vi3 e1-weibo-addVideo"></b></i>\
						<i class="extMenu" title="音乐"><b class="vi4 e1-weibo-addMusic"></b></i>\
						<i class="extMenu" title="话题"><b class="vi5 e1-weibo-addTopic"></b></i>\
					</span>\
				</span><span class="right">快捷回复：<em class="select_outer"><select><option>对你的参与，我必须说：客官，洗洗睡吧。</option></select></em></span></div>\
				<p class="btn_area"><a href="javascript:;" class="wei_btn_1 e0-Ks-wboForward-'+data.id +'">发布</a></p>\
			</div>','转发微博')
			}else{
				popup.alert_big('<div class="weibo_transmit">\
				<p class="pub_say">'+
				data.content    
				+'</p>\
				<div class="wei_transmit_select">\
					<ul class="select box">\
						<li id="typeFilterLi"><a href="javascript:void(0)" id="typeFilter" class="e0-Animate-toggleFilter-type">关键字</a>\
						  <div id="typeCandidate" class="option" style="display: none;">\
							<ul>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字1</a></li>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字2</a></li>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字3</a></li>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字4</a></li>\
							  <li><a href="javascript:void(0)" class="e0-Animate-setFilter-type">关键字5</a></li>\
							</ul>\
						  </div>\
						</li>\
					</ul>\
				</div>\
				<div class="sub_text_zn">\
					<textarea id="wei_transmit_text">'+data.comment+'</textarea>\
				</div>\
				<p class="wei_bottom_line"><span class="left"></span><span class="right">快捷回复：<em class="select_outer"><select><option>对你的参与，我必须说：客官，洗洗睡吧。</option></select></em></span></p>\
				<p class="btn_area"><a href="javascript:;" class="wei_btn_1 e0-Ks-wboForward-'+data.id +'">发布</a></p>\
			</div>','转发微博')
			}
			weibo.wEditor=G('wei_transmit_text');
		}
	}
})();



$('#quick_board').hide();
$('#wei_option_board').hide();
$('#menu .m-li').each(function(){
	$(this).click(function(){
		if($(this).next('.m-sub').length){
			if(!$(this).next('.m-sub').is(':visible')){$('#menu .visible').prev('.m-li').find('em').css({transform:'rotate(0deg)'}).end().end().slideUp().removeClass('visible');$(this).next('.m-sub').slideDown().addClass('visible');$(this).find('em').css({transform:'rotate(-180deg)'});}
			else{$(this).next('.m-sub').slideUp();$(this).find('em').css({transform:'rotate(0deg)'});}
		}
		$(this).find('a').blur();	
		//return false;
	})
})

//添加微博
function addWb(t){
	//t.className = 'add_bg_zn_on';
	funTool.addClass(t,'add_bg_zn_on');
}
//移除添加微博
function outWb(t){
	//t.className = '';
	funTool.removeClass(t,'add_bg_zn_on');
}
//显示微博内容
function addWbCon(t,c,event){
	//t.className = 'on';
	funTool.addClass(t,c,event);
}
//隐藏微博内容
function outWbCon(t){
	//t.className = '';
	funTool.removeClass(t,'on');
}
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
    //此部分为计算当前时间
    task : function(obj){
        //对象父元素table
        var tab = this.getParent(obj,'table');
        //td集合
        var td = this.getTagName(tab,'td');
        //对象父元素div
        var div = this.getParent(obj,'div');
        //div集合
        var divTag = this.getTagName(div.parentNode,'div');
        //对象td索引
        var tdIndex = this.index(obj.parentNode,td);
        //console.log(this.getPreNode(div.parentNode))
        //对象div索引
        var divIndex = this.index(div,divTag);
        //几号，星期几
        var th = this.getTagName(this.getId('zj_zn'),'th');
        var xq = th[tdIndex+1].innerHTML;
        // console.log(div)
        // console.log(divTag)
        // console.log(divIndex)
        // console.log(divTag[0])
        //var xq = tdIndex+1;
        //正点时间
        var zd = this.getPreNode(div.parentNode).innerHTML.replace(/:\d+/,'');
        //获取分钟 判断时间是否超过30分 大于0超过
        var fz ;
        if(divIndex>0){
            fz = '31';
        }
        else{
            fz = '01';
        }
        console.log('今天是'+ xq + ' ' + zd + ':' + fz);
    }
}
var funTool = new myFun();
$('.add_zn').click(function(){
    funTool.task(this);
})
        
        var myDate = new Date(); 
        var mon = myDate.getMonth()+1; 
        var day = myDate.getDate();
        var hours = myDate.getHours();
        var hourTime = myDate.getHours();
        var minutes = myDate.getMinutes(); 
        var week = myDate.getDay();
        if(week==2){
        	week='星期二';
        }
        //console.log(mon+'月'+day+'号'+week+hours+'时'+minutes+"分")
        
        
//计算过去时间 当前时间
//需要参数 - 月、日、小时、分钟
var timeCover = function(){}
timeCover.prototype = {
	//当前时间在表格的竖向位置
	vertical : function(mon,day){
		var dayTime = mon+'-'+day;
		//var hourTime = myDate.getHours();
		var thAll = funTool.getTagName(funTool.getId('zj_zn'),'th'); 
		var thAttributeArr = [];
		for(var i=1;i<thAll.length;i++){
			thAttributeArr.push(thAll[i].getAttribute('date-time'));
		}
		for(var i = 0;i< thAttributeArr.length;i++){
			if(thAttributeArr[i]==dayTime){
				getTh = i;
			}
		}
		return getTh;
	},
	//当前整点时间
	pointTime : function(hourTime,minutes){
		//var hourTime = myDate.getHours();
		var getTh = this.vertical();
		var tdAll = funTool.getClassName('td_w52','wei_main','td'); 
		var tdAttributeArr = [];
		
		for(var i=1;i<tdAll.length;i++){
			tdAttributeArr.push(tdAll[i].getAttribute('date-time'));
		}
		for(var i = 0;i< tdAttributeArr.length;i++){
			if(tdAttributeArr[i]==hourTime){
				getTd = i;
			}
		}
		var tdArr = []
		var thLen = getTh+1;
		var tabAll = funTool.getClassName('top_border_td','wei_main','table'); 
		for(var i=0;i<tabAll.length;i++){
			 _td = funTool.getTagName(tabAll[i],'td');
			for(var k=0;k<getTh;k++){
				_td[k].className='bg';
			}
		}
		var __tdLen
		var ___tdLen
		if(minutes>30){
			__tdLen = (getTd+1)*2+1;
			
		}else{
			__tdLen = (getTd+1)*2;
		}
		for(var i=0;i<__tdLen;i++){
			 __td = funTool.getTagName(tabAll[i],'td');
					for(var k=1;k<getTh+1;k++){
					__td[k].className = 'bg';
				}
		}
		var thisTd = funTool.getTagName(tabAll[__tdLen],'td');
		thisTd[getTh].className = 'fuck';
		var thisHeight = thisTd[getTh].clientHeight;
		var thisDiv = document.createElement('div');
		thisDiv.className = 'time_zn';
		var thisMinutes = (minutes%60)/100;
		thisDiv.style.height = thisHeight*thisMinutes + 'px';
		thisTd[getTh].appendChild(thisDiv);
	},
	//fun
	doFun : function(mon,day,hourTime,minutes){
		this.vertical(mon,day);
		this.pointTime(hourTime,minutes);
		console.log(mon+";"+day+";"+hourTime+";"+minutes);
	}
}
        
        var coverTime = new timeCover();
       // coverTime.doFun(mon,day,hourTime,minutes);
//         
// var dayTime = mon+'-'+day;
// var hourTime = myDate.getHours();
// var thAll = funTool.getTagName(funTool.getId('zj_zn'),'th'); 
// var thAttributeArr = [];
// 
// for(var i=1;i<thAll.length;i++){
	// thAttributeArr.push(thAll[i].getAttribute('date-time'));
// }
// for(var i = 0;i< thAttributeArr.length;i++){
	// if(thAttributeArr[i]==dayTime){
		// getTh = i;
	// }
// }
// //算整点时间
// var tdAll = funTool.getClassName('td_w52','wei_main','td'); 
// var tdAttributeArr = [];
// 
// for(var i=1;i<tdAll.length;i++){
	// tdAttributeArr.push(tdAll[i].getAttribute('date-time'));
// }
// for(var i = 0;i< tdAttributeArr.length;i++){
	// if(tdAttributeArr[i]==hourTime){
		// getTd = i;
	// }
// }
// var tdArr = []
// var thLen = getTh+1;
// var tabAll = funTool.getClassName('top_border_td','wei_main','table'); 
// for(var i=0;i<tabAll.length;i++){
	 // _td = funTool.getTagName(tabAll[i],'td');
	// for(var k=0;k<getTh;k++){
		// _td[k].className='bg';
	// }
// }
// var __tdLen
// var ___tdLen
// if(minutes>30){
	// __tdLen = (getTd+1)*2+1;
// 	
// }else{
	// __tdLen = (getTd+1)*2;
// }
// for(var i=0;i<__tdLen;i++){
	 // __td = funTool.getTagName(tabAll[i],'td');
			// for(var k=1;k<getTh+1;k++){
			// __td[k].className = 'bg';
		// }
// }
// var thisTd = funTool.getTagName(tabAll[__tdLen],'td');
// thisTd[getTh].className = 'fuck';
// var thisHeight = thisTd[getTh].clientHeight;
// var thisDiv = document.createElement('div');
// thisDiv.className = 'time_zn';
// var thisMinutes = (minutes%60)/100;
// thisDiv.style.height = thisHeight*thisMinutes + 'px';
// thisTd[getTh].appendChild(thisDiv);

//console.log(thisMinutes)

//console.log(hourTime+' '+thAttributeArr.length+' ' +getTd)

