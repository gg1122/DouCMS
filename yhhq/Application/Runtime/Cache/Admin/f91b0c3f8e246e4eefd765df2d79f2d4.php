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
    
<fieldset class="layui-elem-field">
    <legend>相册管理 - 照片列表</legend>
    <div class="layui-field-box">
		<blockquote class="layui-elem-quote news_search">
		  <form class="layui-form" id="form-admin-add" action="">
	      <div class="layui-input-inline">
	          <label class="layui-form-label">照片分类</label>
	          <div class="layui-input-block">
                <select class="cate" id="cate" name="cid" style="height:38px">
                  <option value="">--请选择分类--</option>
                  <?php if(is_array($cates)): $i = 0; $__LIST__ = $cates;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo["res"] == 0): ?><option value="<?php echo ($vo["pid"]); ?>" <?php echo ($cat_id == $vo['pid']?'selected':'');?>><?php echo ($vo['showName']); echo ($vo['title']); ?></option>
    	              <?php else: ?>
    	              	  <optgroup label="<?php echo ($vo['title']); ?>"></optgroup><?php endif; endforeach; endif; else: echo "" ;endif; ?>
              </select>
          </div>
	      </div>
	      <div class="layui-input-inline">
	          <label class="layui-form-label">照片描述</label>
	          <div class="layui-input-block">
                    <input type="text" value=""  name="image_desc"  class="desc layui-input">
              </div>
	      </div>
	      </form>
		</blockquote>
		<div class="layui-field-box">
			<div id="zyupload" class="zyupload"></div>  		   
		</div>
   </div>
</fieldset>
<!-- 引用控制层插件样式 -->
<link rel="stylesheet" href="/htdocs/Public/upload/css/zyupload-1.0.0.min.css" type="text/css">		
<!--<script type="text/javascript" src="/htdocs/Public/upload/js/zyupload-1.0.0.min.js"></script>-->
<script type="text/javascript" src="/htdocs/Public/upload/js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="/htdocs/Public/upload/js/zyupload-1.0.0.min.js"></script>
<!-- 引用控制层插件 -->

<script>
    	layui.use(['form','layer'],function(){
    	    var form = layui.form(),
    	        layer = parent.layer === undefined ? layui.layer : parent.layer,
    	        $ = layui.jquery;
    	})
    	

			$(function(){
				// 初始化插件
				$("#zyupload").zyUpload({
					width            :   "650px",                 // 宽度
					height           :   "400px",                 // 宽度
					itemWidth        :   "140px",                 // 文件项的宽度
					itemHeight       :   "115px",                 // 文件项的高度
					url              :   "<?php echo U('Admin/Images/add');?>",              // 上传文件的路径
					fileType         :   ["jpg","png","PNG","JPG","JPEG","txt","gif","GIF","js"],// 上传文件的类型
					fileSize         :   51200000000,                // 上传文件的大小
					multiple         :   true,                    // 是否可以多个文件上传
					dragDrop         :   true,                    // 是否可以拖动上传文件
					tailor           :   true,                    // 是否可以裁剪图片
					del              :   true,                    // 是否可以删除文件
					finishDel        :   false,  				  // 是否在上传文件完成后删除预览
					/* 外部获得的回调接口 */
					onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
						console.info("当前选择了以下文件：");
						console.info(selectFiles);
					},
					onDelete: function(file, files){              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
						console.info("当前删除了此文件：");
						console.info(file.name);
					},
					onSuccess: function(file, response){          // 文件上传成功的回调方法
						console.info("此文件上传成功：");
						console.info(file.name);
						console.info("此文件上传到服务器地址：");
						console.info(response);
				        var res = response;
				        var cid = $("#cate").val();
				        var desc = $(".desc").val();
				        $.ajax({
				            url:"<?php echo U('Admin/Images/add');?>",
				            data:{cid:cid,desc:desc,res:res},
				            type:"POST",
				            async: false,
				            success:function(result){
				                
                                $("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");
                            }
				        });
                    	
					},
					onFailure: function(file, response){          // 文件上传失败的回调方法
				// 		console.info("此文件上传失败：");
				// 		console.info(file.name);
					},
					onComplete: function(response){           	  // 上传完成的回调方法
				// 		console.info("文件上传完成");
				// 		console.info(response);
				
    				setTimeout(function(){
    				    parent.layer.closeAll();
    				},2000)
				
					}
				});
				
			});
		

	</script>
	
</div>
<script src="/htdocs/Public/Home/js/bootstrap.min.js"></script>
</body>
</html>