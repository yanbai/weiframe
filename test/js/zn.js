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
                //�ҵ���һ���ڵ�ͷ��ؽڵ㣬û�ҵ��ͷ���null
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
                //����Ԫ��table
                var tab = this.getParent(obj,'table');
                //td����
                var td = this.getTagName(tab,'td');
                //����Ԫ��div
                var div = this.getParent(obj,'div');
                //div����
                var divTag = this.getTagName(div,'div');
                //����td����
                var tdIndex = this.index(obj.parentNode,td);
                //����div����
                var divIndex = this.index(divTag,div);
                //���ţ����ڼ�
                var th = this.getTagName(this.getId('zj_zn'),'th');
                var xq = th[tdIndex+1].innerHTML;
                //console.log(xq)
                //var xq = tdIndex+1;
                //����ʱ��
                var zd = this.getPreNode(div.parentNode).innerHTML.replace(/:\d+/,'');
                //��ȡ���� �ж�ʱ���Ƿ񳬹�30�� ����0����
                var fz ;
                if(divIndex>0){
                    fz = '31';
                }
                else{
                    fz = '01';
                }
                console.log('������'+ xq + ' ' + zd + ':' + fz);
            }
        }
        var taskZn = new taskFun();
        $('.add_zn').click(function(){
            taskZn.task(this);
        })

        

        