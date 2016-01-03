$(document).ready(function(){
	 
  
     var setting = {
			async: {
				enable: true,
				url:"/dcm/zk/getChildren",
				autoParam:["id"],  
				type: "get",
				dataType: "json"
			} ,
			callback: {
				beforeClick: beforeClick,
				beforeCollapse: beforeCollapse,
				beforeExpand: beforeExpand,
				onCollapse: onCollapse,
				onExpand: onExpand,
				onClick: onClick,
				onRightClick: OnRightClick
			}
		};
         //节点点击事件
         function onClick(event, treeId, treeNode, clickFlag) { 
                 $.get("/dcm/zk/getData",{path:treeNode.id},function(result){ 
                       $('#data').val(result.data);    
                       $('#path').val(treeNode.id);    
                       $('#czxid').html(result.czxid);    
                       $('#mzxid').html(result.mzxid);    
                       $('#ctime').html(result.ctime);    
                       $('#mtime').html(result.mtime);    
                       $('#version').html(result.version);    
                       $('#cversion').html(result.cversion);    
                       $('#aversion').html(result.aversion);    
                       $('#ephemeralOwner').html(result.ephemeralOwner);    
                       $('#dataLength').html(result.dataLength);           
                       $('#pzxid').html(result.pzxid);    
                       $('#numChildren').html(result.numChildren);    
                       
                  });

	     }
	     //节点右键事件
         function OnRightClick(event, treeId, treeNode) {
			if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
				zTree.cancelSelectedNode();
				showRMenu("root", event.clientX, event.clientY);
			} else if (treeNode && !treeNode.noR) {
				zTree.selectNode(treeNode);
				showRMenu("node", event.clientX, event.clientY);
			}
		}

      //显示节点右键菜单
      function showRMenu(type, x, y) {
			$("#rMenu ul").show();
			if (type=="root") {
				$("#m_del").hide();
				$("#m_check").hide();
				$("#m_unCheck").hide();
			} else {
				$("#m_del").show();
				$("#m_check").show();
				$("#m_unCheck").show();
			}
			rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

			$("body").bind("mousedown", onBodyMouseDown);
		}

        
        function onBodyMouseDown(event){
			if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
				rMenu.css({"visibility" : "hidden"});
			}
		}


	   function beforeClick(treeId, treeNode) {
			if (treeNode.isParent) {
				return true;
			} else {
				 
				return false;
			}
		}
		function beforeCollapse(treeId, treeNode) {
			 
			 
			return (treeNode.collapse !== false);
		}
		function onCollapse(event, treeId, treeNode) {
			 
		}		
		function beforeExpand(treeId, treeNode) { 
			return (treeNode.expand !== false);
		}

		//节点展开事件
		function onExpand(event, treeId, treeNode) {
		         
		}

        function refreshNode(node) { 
			var nodes = node || zTree.getSelectedNodes();
			if (nodes.length == 0) {
				// msg("请先选择一个父节点"); 
				 
			}
			for (var i=0, l=(nodes.length || 1); i<l; i++) {
				zTree.reAsyncChildNodes(nodes[i], 'refresh', true);
				if (!true) zTree.selectNode(nodes[i]);
			}
		}

		$(document).ready(function(){
			$.fn.zTree.init($("#zkTree"), setting);
			zTree = $.fn.zTree.getZTreeObj("zkTree");
			rMenu = $("#rMenu");


			$('#add').click(function(){
				openAddForm();
			});
            $('#saveAddNode').click(function(){
            	     $('#addNodeModal').modal('hide'); 
				createNode($('#addNodeForm').serialize());
			});
            $('#delete').click(function(){
				 deleteNode();
			});
			
           setServerInfo();
          setInterval(function(){ 
              setServerInfo();
           }, 2000); 


		});
  
	 Number.prototype.toFixed  =   function ( exponent)
     { 
         return  parseInt( this   *  Math.pow(  10 , exponent)  +   0.5 )/Math.pow(10,exponent);
      };

	function setServerInfo(){
		$.get('/dcm/server/stat',null,function(data){
             $('#heap').html(data.heapUsed+' of '+data.heapTotal);  
             $('#heapProcess').attr('style', 'width:'+parseInt(FloatCalFun.floatDiv(parseFloat(data.heapUsed),parseFloat(data.heapTotal))*100)+'%');
             $('#nodeVersion').html(data.version);
             $('#platform').html(data.platform);
             $('#pid').html(data.pid); 
                       
              });
             
	};
 
	
	/* ---------- Placeholder Fix for IE ---------- */
	$('input, textarea').placeholder();

	/* ---------- Auto Height texarea ---------- */
	$('textarea').autosize();
	
	 
	$('#submit').click(function() {  

 
     // 更新节点数据
     $.post('/dcm/zk/setData',$('#nodeInfoForm').serialize(),function(data){
           
      });
  });
	 

  //显示创建节点页面
   function openAddForm(){
   	     var parentPath=$('#path').val();
   	     if(parentPath && parentPath!=null && parentPath!='')
   	     {
   	     	$('#parent').val(parentPath);
   	     	$('#parentP').html(parentPath);
           $('#addNodeModal').modal('toggle'); 
   	     }else
   	     {
   	     	parentPath='/';
   	     	$('#parent').val(parentPath);
   	     	$('#parentP').html(parentPath);
           $('#addNodeModal').modal('toggle'); 
   	     }
   	     
   };

    //提交创建节点请求
    function createNode(data){ 
         $.post('/dcm/zk/create',data,function(data){ 
             refreshNode(); 
      });
    };

   // 删除节点
   function deleteNode(path){
           var path=$('#path').val();
            $.post('/dcm/zk/delete',{path:path},function(data){  
            $.fn.zTree.init($("#zkTree"), setting);
             msg(data.data);
      });
   };


   // 显示信息提示框
   function msg(msg) { 
       $('#modalMsg').html(msg); 
       $('#infoModal').modal('toggle');  
   };
	
	 var FloatCalFun=new Object();
//获取参数精度，如果为整数则精度为0
FloatCalFun._getPrecision=function(arg){
if(arg.toString().indexOf(".")==-1){
 return 0;
}else{
 return arg.toString().split(".")[1].length;
}

};
//获取小数的整数形式
FloatCalFun._getIntFromFloat=function(arg){
if(arg.toString().indexOf(".")==-1){
 return arg;
}else{
 return Number(arg.toString().replace(".",""));
}
};

FloatCalFun.floatDiv=function(arg1,arg2){
 var precision1=this._getPrecision(arg1); 
 var precision2=this._getPrecision(arg2); 
 var int1=this._getIntFromFloat(arg1); 
 var int2=this._getIntFromFloat(arg2); 
 var result=(int1/int2)*Math.pow(10,precision2-precision1); 
 return result; 
};
	
	
});


