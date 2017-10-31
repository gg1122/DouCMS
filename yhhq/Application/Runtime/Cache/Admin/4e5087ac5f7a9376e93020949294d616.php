<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title><?php echo C('APP_NAME');?>管理后台</title>
    <link rel="stylesheet" href="/htdocs/Public/common/layui1.09/css/layui.css">
    <script type="text/javascript" src="/htdocs/Public/common/layui1.09/layui.js"></script>
    <script src="/htdocs/Public/common/js/jquery-3.2.0.min.js"></script>
	<link rel="stylesheet" href="/htdocs/Public/css/main2.css" media="all" />
	<link rel="stylesheet" href="/htdocs/Public/css/images.css" media="all" />
	<!--<link rel="stylesheet" href="/htdocs/Public/Home/css/bootstrap.min.css"  type="text/css">-->
	<!--<link rel="stylesheet" href="/htdocs/Public/Home/font-awesome-4.4.0/css/font-awesome.min.css"  type="text/css">	-->
	<!-- <link rel="stylesheet" href="/htdocs/Public/Home/css/style.css?ver=1.0">
	<script type="text/javascript" src="/htdocs/Public/js/index.js"></script> -->
	<link href="/htdocs/Public/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
</head>
<body>
<div style="margin:15px;">
    
<style type="text/css">
/* 标签重定义 */
img{border:none;}
a{text-decoration:none;color:#444;}
a:hover{color:#999;cursor:pointer}
#title{width:600px;margin:20px auto;text-align:center;}
/* 定义关键帧 */
@-webkit-keyframes shade{
	from{opacity:1;}
	15%{opacity:0.4;}
	to{opacity:1;}
}
@-moz-keyframes shade{
	from{opacity:1;}
	15%{opacity:0.4;}
	to{opacity:1;}
}
@-ms-keyframes shade{
	from{opacity:1;}
	15%{opacity:0.4;}
	to{opacity:1;}
}
@-o-keyframes shade{
	from{opacity:1;}
	15%{opacity:0.4;}
	to{opacity:1;}
}
@keyframes shade{
	from{opacity:1;} 
	15%{opacity:0.4;}  
	to{opacity:1;}
}
/* wrap */
#wrap{width:auto;height:auto;margin:0 auto;position:relative;} 
#wrap .box{width:200px;height:auto;padding:10px;border:none;float:left;}
#wrap .box .info{position:relative;width:200px;height:auto;border-radius:8px;box-shadow:0 0 11px #666;}
#wrap .box .info .pic{width:180px;height:auto;margin:0 auto;padding-top:10px;}
#wrap .box .info .pic:hover{
	-webkit-animation:shade 3s ease-in-out 1;
	-moz-animation:shade 3s ease-in-out 1;
	-ms-animation:shade 3s ease-in-out 1;
	-o-animation:shade 3s ease-in-out 1;
	animation:shade 3s ease-in-out 1;
}
#wrap .box .info .pic img{width:180px;border-radius:3px;padding-bottom:10px;}
#wrap .box .info .title{width:180px;height:40px;margin:0 auto;line-height:40px;text-align:center;color:#666;font-size:18px;font-weight:bold;overflow:hidden;}

/*.info a {
    display: block;
    position: absolute;
    top: 0; 
    opacity: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    color: inherit;
} 
.info:hover a {
    opacity: 1;
    top: 0; 
    z-index: 500;
}


.info:hover .title {
    opacity: 1;
    bottom: 0; 
    z-index: 500;
}

.info:hover a i {
    top: 50%;
    position: absolute;
    left: 0;
    right: 0;
    transform: translateY(-50%);
}*/

</style>

<script type="text/javascript">
window.onload = function(){
	//运行瀑布流主函数
	PBL('wrap','box');
	
	//模拟数据
	//var data = [{'src':'1.jpg','title':'This is a title.'},{'src':'2.jpg','title':'This is a title.'},{'src':'3.jpg','title':'This is a title.'},{'src':'4.jpg','title':'This is a title.'},{'src':'5.jpg','title':'This is a title.'},{'src':'6.jpg','title':'This is a title.'},{'src':'7.jpg','title':'This is a title.'},{'src':'8.jpg','title':'This is a title.'},{'src':'9.jpg','title':'This is a title.'},{'src':'10.jpg','title':'This is a title.'}];
	
	
	//设置滚动加载
	window.onscroll = function(){
		//校验数据请求
		if(getCheck()){			
			$.ajax({  
		          type : "post",  
		          url : "<?php echo U('index');?>",  
		          data : {page:"<?php echo ($pageindex); ?>"},  
		          async : false,  
		          success : function(s){
		        	  var wrap = document.getElementById('wrap');
		  			for(i in s.data){
		  				//创建box
		  				var box = document.createElement('div');
		  				box.className = 'box';
		  				wrap.appendChild(box);
		  				//创建info
		  				var info = document.createElement('div');
		  				info.className = 'info';
		  				box.appendChild(info);
		  				//创建pic
		  				var pic = document.createElement('div');
		  				pic.className = 'pic';
		  				info.appendChild(pic);
		  				//创建img
		  				var img = document.createElement('img');
		  				img.src = 'images/'+s.data[i].src;
		  				img.style.height = 'auto';
		  				pic.appendChild(img);
		  				//创建title
		  				var title = document.createElement('div');
		  				title.className = 'title';
		  				info.appendChild(title);
		  				//创建a标记
		  				var a = document.createElement('a');
		  				a.innerHTML = s.data[i].title;
		  				title.appendChild(a);
		  			}
		  			PBL('wrap','box');
		          }
			});
			
		}
	}
}
/**
* 瀑布流主函数
* @param  wrap	[Str] 外层元素的ID
* @param  box 	[Str] 每一个box的类名
*/
function PBL(wrap,box){
	//	1.获得外层以及每一个box
	var wrap = document.getElementById(wrap);
	var boxs  = getClass(wrap,box);
	//	2.获得屏幕可显示的列数
	var boxW = boxs[0].offsetWidth;
	var colsNum = Math.floor(document.documentElement.clientWidth/boxW);
	wrap.style.width = boxW*colsNum+'px';//为外层赋值宽度
	//	3.循环出所有的box并按照瀑布流排列
	var everyH = [];//定义一个数组存储每一列的高度
	for (var i = 0; i < boxs.length; i++) {
		if(i<colsNum){
			everyH[i] = boxs[i].offsetHeight;
		}else{
			var minH = Math.min.apply(null,everyH);//获得最小的列的高度
			var minIndex = getIndex(minH,everyH); //获得最小列的索引
			getStyle(boxs[i],minH,boxs[minIndex].offsetLeft,i);
			everyH[minIndex] += boxs[i].offsetHeight;//更新最小列的高度
		}
	}
}
/**
* 获取类元素
* @param  warp		[Obj] 外层
* @param  className	[Str] 类名
*/
function getClass(wrap,className){
	var obj = wrap.getElementsByTagName('*');
	var arr = [];
	for(var i=0;i<obj.length;i++){
		if(obj[i].className == className){
			arr.push(obj[i]);
		}
	}
	return arr;
}
/**
* 获取最小列的索引
* @param  minH	 [Num] 最小高度
* @param  everyH [Arr] 所有列高度的数组
*/
function getIndex(minH,everyH){
	for(index in everyH){
		if (everyH[index] == minH ) return index;
	}
}
/**
* 数据请求检验
*/
function getCheck(){
	var documentH = document.documentElement.clientHeight;
	var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
	return documentH+scrollH>=getLastH() ?true:false;
}
/**
* 获得最后一个box所在列的高度
*/
function getLastH(){
	var wrap = document.getElementById('wrap');
	var boxs = getClass(wrap,'box');
	return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
}
/**
* 设置加载样式
* @param  box 	[obj] 设置的Box
* @param  top 	[Num] box的top值
* @param  left 	[Num] box的left值
* @param  index [Num] box的第几个
*/
var getStartNum = 0;//设置请求加载的条数的位置
function getStyle(box,top,left,index){
    if (getStartNum>=index) return;
    $(box).css({
    	'position':'absolute',
        'top':top,
        "left":left,
        "opacity":"0"
    });
    $(box).stop().animate({
        "opacity":"1"
    },999);
    getStartNum = index;//更新请求数据的条数位置
}
</script>
<fieldset class="layui-elem-field">
    <legend>相册管理 - 照片列表</legend>
    <div class="layui-field-box">
        <form class="layui-form">
		<blockquote class="layui-elem-quote news_search">
			<div class="layui-inline">
				<input type="checkbox" name="selectAll" id="selectAll" lay-filter="selectAll" lay-skin="primary" title="全选">
			</div>
			<div class="layui-inline">
				<a class="layui-btn layui-btn-danger batchDel">批量删除</a>
			</div>
			<div class="layui-inline">    						  			
      			<span class="layui-btn imgadd"><i class="layui-icon">&#xe608;</i>上传照片</span>
   			</div>
		    <div class="layui-input-inline" style="width:100px">
		      <input class="layui-input" placeholder="开始日" id="LAY_demorange_s">
		    </div>
		    <div class="layui-input-inline" style="width:100px">
		      <input class="layui-input" placeholder="截止日" id="LAY_demorange_e">
		    </div>
	      <div class="layui-input-inline">
          <select class="cate" name="cate_id" lay-verify="" style="height:38px">
              <option value="">全部分类</option>
              <?php if(is_array($cates)): $i = 0; $__LIST__ = $cates;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo["res"] == 0): ?><option value="<?php echo ($vo["pid"]); ?>" <?php echo ($cat_id == $vo['pid']?'selected':'');?>><?php echo ($vo['showName']); echo ($vo['title']); ?></option>
	              <?php else: ?>
	              	  <optgroup label="<?php echo ($vo['title']); ?>"></optgroup><?php endif; endforeach; endif; else: echo "" ;endif; ?>
          </select>
	      </div>
	      <div class="layui-inline">
		      <span class="layui-btn sub">搜索</span>
		    </div>
		     <div class="layui-inline">
		      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
		    </div>
		    <div class="layui-inline">
		      <a class="layui-btn num"></a>
		    </div>
		    <div class="layui-inline">
    			<a class="layui-btn"  href="javascript:location.replace(location.href);" title="刷新"><i class="layui-icon" style="line-height:30px">ဂ</i></a>
  			</div>
		</blockquote>
	</form>
	<div id="wrap">
	<?php if(is_array($list)): foreach($list as $k=>$v): ?><div class="box">
			<div class="info" style="position:relative;overflow:hidden">
				<div class="pic"><img  src="<?php echo ($v['image_url']); ?>"/></div>
				<div class="title" style="position:absolute;bottom:0px;border-radius:0 0 8px 8px;left:-297px;top: -198px;width:100%;height:100%;color:white;background-color:#000000; opacity:0.5; -moz-opacity:0.5; filter:alpha(opacity=50);">
				    <a href="#" style="color:#fff;"><div class="desc_<?php echo ($v['img_id']); ?>" style="margin-top:30px"><?php echo ($v['image_desc']); ?></div></a>
				    <a class="img_del" style="position:absolute;bottom:20px;left:40px;width:30px;height:30px;" data-key="<?php echo ($v['image_url']); ?>" data-name="<?php echo ($v['image_desc']); ?>" data-id="<?php echo ($v['img_id']); ?>"><i class="fa fa-times fa-2x" style="margin-right:10px;color:#fff"></i></a>
				     <a class="img_edit" style="position:absolute;bottom:20px;left:130px;width:30px;height:30px;" data-key="<?php echo ($v['image_url']); ?>" data-name="<?php echo ($v['image_desc']); ?>" data-id="<?php echo ($v['img_id']); ?>"><i class="fa fa-pencil fa-2x" style="margin-right:10px;color:#fff"></i></a>
				
				</div>
				<!--<a class="a2"><i class="fa fa-pencil fa-3x" style="margin-left:10px;color: #fff"></i></a>-->
			</div>
		</div><?php endforeach; endif; ?>
	</div>
   </div>
</fieldset>


<script>
$(document).ready(function(){
    var height = $(window).height()+350;
    $(".layui-elem-field").css("height",height);
    //图片遮罩
    $(".info").hover(function() {
		$(this).find(".title").stop().animate({"left": 0,"top":0});
	}, function() {
		$(this).find(".title").stop().animate({"left":-297,"top":-198});
	})
})
	/* $(document).ready(function(){
	    	/*var imgNums = 15; 
	    	// 点击加载更多
	    	$('.load_more').click(function(){
	    		var html = "";
	    		var img = '';
	    		$.get("<?php echo ('index');?>",{cid:window.da},function(data){
	    			var maxPage = imgNums*page < data.length ? imgNums*page : data.length;
	    			for(var i=imgNums*(page-1); i<maxPage; i++){
	    			html = html + "<div class='grid'>"+
	    				"<div class='imgholder'>"+
	    				"<img class='lazy thumb_photo' title='"+i+"' src='/htdocs/Public/images/pixel.gif' data-original='"+ data[i].image_url +"' width='225' onclick='seeBig(this)'/>"+
	    				"</div>"+
	    				"</div>";
	    			img = img + "<img class='img' src='"+ data[i].image_url +"'>";
	    		  }
	    		});
	    		$('#container').append(html);
	    		$('.content').append(img);
	    		$('#container').BlocksIt({
	    			numOfCol:4,  //每行显示数
	    			offsetX: 5,  //图片的间隔
	    			offsetY: 5   //图片的间隔
	    		});
	    		$("img.lazy").lazyload();
	    	});*/
	layui.config({
		base : "/htdocs/Public/js/lib/"
	}).use(['laydate','flow','form','layer'],function(){
	    var flow = layui.flow,
	        form = layui.form(),
            laydate = layui.laydate,//日期插件
	        layer = parent.layer === undefined ? layui.layer : parent.layer,
	        $ = layui.jquery;

	    //流加载图片

		    var imgNums = 15;  //单页显示图片数量
		    flow.load({
		        elem: '#wrap', //流加载容器
		        done: function(page, next){ //加载下一页		        	
		            //$.get("<?php echo ('index');?>",{page:page},function(data){
		            $.ajax({
                        type: "GET",
                        url: "<?php echo ('Admin/Images/index');?>",
                        data: {page:page},
                        dataType: "json",
                        success: function(data){
		                console.log(data);
		                //模拟插入
		                //if(data)
    		                var imgList = [];
    		                var maxPage = imgNums*page < data.length ? imgNums*page : data.length;
    		                setTimeout(function(){
    		                    for(var i=imgNums*(page-1); i<maxPage; i++){
    		                        imgList.push('<div class="box"><div class="info"><div class="pic"><img src="'+data.image_url+'"/></div><div class="title"><a href="#">'+data.image_desc+'</a></div><a class="img_del" data-key="'+data.image_url+'" data-name="'+data.image_desc+'" data-id="'+data.img_id+'"><i class="fa fa-times fa-3x" style="margin-right:10px;color: #FF5722"></i></a></div></div>')
    
    		                    }
    		                    next(imgList.join(''), page < (data.length/imgNums));
    		                    form.render();
    		                  
    		                  
    		                }, 500);
                        }
		            }); 
		        }
		    });
		    

    	form.on('submit(search)', function(data){
    		
    		
    	})	    	

	    $('.imgadd').on('click', function () {
            //alert(1313);
            layer.open({
                type: 2,
                area: ['60%', '70%'],
                maxmin: true,
                content: '<?php echo U("add");?>'
            });
        });
         $('.img_edit').on('click', function () {
            //alert(1313);
            var _this = $(this);
	        var id = _this.attr("data-id");
            layer.open({
                type: 2,
                area: ['50%', '60%'],
                maxmin: true,
                content: "<?php echo U('Admin/Images/edit/id/" + id + "');?>",
            });
        });
        
        function editdesc(id,desc){
            //console.log(desc);
            $(".desc_"+id).text(desc);
        }
	    //删除单张图片
	    $(".img_del").on("click",function(){
	        var _this = $(this);
	        var name = _this.attr("data-name");
	        var key = _this.attr("data-key");
	        var id = _this.attr("data-id");
	        console.log(key);
	        //console.log(id);
	        layer.confirm('确定删除图片"'+name+'"吗？',{icon:3, title:'提示信息'},function(index){
	            _this.parents("li").hide(1000);
	            $.get("<?php echo ('del');?>",{file:key,id:id},function(data){
	            	layer.msg(data.msg,{time:1800});
	            	    setTimeout(function(){_this.parents(".box").remove();},950);
	                layer.close(index);
	            }); 
	            
	        });
	    })

	    //全选
	    form.on('checkbox(selectAll)', function(data){
	        var child = $("#Images li input[type='checkbox']");
	        child.each(function(index, item){
	            item.checked = data.elem.checked;
	        });
	        form.render('checkbox');
	    });

	    //通过判断文章是否全部选中来确定全选按钮是否选中
	    form.on("checkbox(choose)",function(data){
	        var child = $(data.elem).parents('#Images').find('li input[type="checkbox"]');
	        var childChecked = $(data.elem).parents('#Images').find('li input[type="checkbox"]:checked');
	        if(childChecked.length == child.length){
	            $(data.elem).parents('#Images').siblings("blockquote").find('input#selectAll').get(0).checked = true;
	        }else{
	            $(data.elem).parents('#Images').siblings("blockquote").find('input#selectAll').get(0).checked = false;
	        }
	        form.render('checkbox');
	    })

	    //批量删除
	    $(".batchDel").click(function(){
	        var $checkbox = $('#Images li input[type="checkbox"]');
	        var $checked = $('#Images li input[type="checkbox"]:checked');
	        if($checkbox.is(":checked")){
	            layer.confirm('确定删除选中的图片？',{icon:3, title:'提示信息'},function(index){
	                var index = layer.msg('删除中，请稍候',{icon: 16,time:false,shade:0.8});
	                setTimeout(function(){
	                    //删除数据
	                    $checked.each(function(){
	                        $(this).parents("li").hide(1000);
	                        setTimeout(function(){$(this).parents("li").remove();},950);
	                    })
	                    $('#Images li input[type="checkbox"]').prop("checked",false);
	                    form.render();
	                    layer.close(index);
	                    layer.msg("删除成功");
	                },2000);
	            })
	        }else{
	            layer.msg("请选择需要删除的图片");
	        }
	    })
	    
	    var start = {
            min: laydate.now()
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
              end.min = datas; //开始日选好后，重置结束日的最小日期
              end.start = datas //将结束日的初始值设定为开始日
            }
          };
          
          var end = {
            min: laydate.now()
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
              start.max = datas; //结束日选好后，重置开始日的最大日期
            }
          };
          
          document.getElementById('LAY_demorange_s').onclick = function(){
            start.elem = this;
            laydate(start);
          }
          document.getElementById('LAY_demorange_e').onclick = function(){
            end.elem = this
            laydate(end);
          }                 

	})
	
	 

            
	
	</script>
	
</div>
<script src="/htdocs/Public/Home/js/bootstrap.min.js"></script>
</body>
</html>