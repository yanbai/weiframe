        function a(t,e){
            t.className = 'on';
            if (e && e.stopPropagation)
                e.stopPropagation()
                else{
                    window.event.cancelBubble=true
            }
        }
        function b(t){
            t.className = '';
        }
        function c(t){
            t.className = 'add_bg_zn_on fn-clear';
//            e.stopPropagation()
//            e.preventDefault()
        }
      
        function d(t){
            t.className = 'add_bg_zn fn-clear';
        }
        var taskFun = function(){}
        taskFun.prototype = {
            getId : function(id){
              if(id) return document.getElementById(id);
            },
            getPreNode : function(node){
                //找到上一个节点就返回节点，没找到就返回null
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
            task : function(obj){
                //对象父元素table
                var tab = this.getParent(obj,'table');
                //td集合
                var td = this.getTagName(tab,'td');
                //对象父元素div
                var div = this.getParent(obj,'div');
                //div集合
                var divTag = this.getTagName(div,'div');
                //对象td索引
                var tdIndex = this.index(obj.parentNode,td);
                //对象div索引
                var divIndex = this.index(divTag,div);
                //几号，星期几
                var th = this.getTagName(this.getId('zj_zn'),'th');
                var xq = th[tdIndex+1].innerHTML;
                //console.log(xq)
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
        var taskZn = new taskFun();
        $('.add_zn').click(function(){
            taskZn.task(this);
        })

        

        