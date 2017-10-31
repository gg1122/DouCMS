<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title><?php echo C('APP_NAME');?></title>
    <link rel="stylesheet" href="/yhhq/Public/common/layui/css/layui.css">
    <link rel="stylesheet" href="/yhhq/Public/css/font-awesome.min.css">
    <link rel="stylesheet" href="/yhhq/Public/kindeditor/themes/default/default.css" type="text/css">
    <link rel="stylesheet" href="/yhhq/Public/kindeditor/themes/default/upload.css?{TIMESTAMP}" type="text/css">
    <script type="text/javascript" src="/yhhq/Public/common/layui1.09/layui.js"></script>
    <script src="/yhhq/Public/common/js/jquery-1.12.4.min.js"></script>
    <script src="/yhhq/Public/js/address.js"></script>
    <script src="/yhhq/Public/jsplug/jparticle.jquery.js"></script>
    <!--<script src="/yhhq/Public/js/login.js"></script> -->
    <script type="text/javascript" src="/yhhq/Public/dataTable/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="/yhhq/Public/dataTable/dataTable.css">
    
</head>
<body>
<div style="margin: 15px;">
    
	<fieldset class="layui-elem-field">
        <legend>参数管理 - 系统参数</legend>
        <div class="layui-field-box">
        <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
			  <ul class="layui-tab-title">
			    <li class="layui-this">网站基本参数</li>
			    <li>网站logo及图片</li>
			    <li>第三方配置参数</li>
			  </ul>
			  <div class="layui-tab-content">
			    <div class="layui-tab-item layui-show">
		    		<form class="layui-form">
						<div class="layui-form-item">
						    <label class="layui-form-label">网站名</label>
						    <div class="layui-input-block">
						    	<input type="text" value="<?php echo ($list["webname"]); ?>" placeholder="请输入网站名称"name="webname"  class="layui-input">
						    </div>
						</div>
						<div class="layui-form-item">
						    <label class="layui-form-label">网站地址</label>
						    <div class="layui-input-block">
						    	<input type="text" value="<?php echo ($list["webaddr"]); ?>" placeholder="请输入网站地址" name="webaddr" class="layui-input">
						    </div>
						</div>
						<div class="layui-form-item">
						    <label class="layui-form-label">SEO标题</label>
						    <div class="layui-input-block">
						    	<input type="text" value="<?php echo ($list["seotitle"]); ?>" name="seotitle" placeholder="请输入SEO标题" lay-verify="required" class="layui-input">
						    </div>
						</div>
						<div class="layui-form-item">
						<label class="layui-form-label">SEO描述</label>
						    <div class="layui-input-block">
						        <textarea placeholder="请输入内容SEO描述" name="seodesc" class="layui-textarea"><?php echo ($list["seodesc"]); ?></textarea>
						    </div>
					    </div>
						<div class="layui-form-item">
						    <label class="layui-form-label">备案号</label>
						    <div class="layui-input-block">
						    	<input type="text" value="<?php echo ($list["bacode"]); ?>" placeholder="请输入备案号" name="bacode" class="layui-input">
						    </div>
						</div>
						<div class="layui-form-item">
						    <label class="layui-form-label">Copyright</label>
						    <div class="layui-input-block">
						    	<input type="text" value="<?php echo ($list["copyright"]); ?>" name="copyright" placeholder="请输入Copyright" lay-verify="required" class="layui-input">
						    </div>
						</div>
						<div class="layui-form-item">
						    <label class="layui-form-label">邮箱</label>
						    <div class="layui-input-block">
						    	<input type="text" value="<?php echo ($list["email"]); ?>" name="email"placeholder="请输入邮箱" lay-verify="required" class="layui-input">
						    </div>
						</div>
						<div class="layui-form-item">
						    <label class="layui-form-label">地址</label>
						    <div class="layui-input-block">
						    	<input type="text" value="<?php echo ($list["addr"]); ?>" name="addr" placeholder="请输入地址" lay-verify="required" class="layui-input">
						    </div>
						</div>
						<div class="layui-form-item">
						    <label class="layui-form-label">联系方式</label>
						    <div class="layui-input-block">
						    	<input type="tel" value="<?php echo ($list["phone"]); ?>" name="phone" placeholder="请输入手机号码" lay-verify="required|phone" class="layui-input">
						    </div>
						</div>
						<div class="layui-form-item">
						    <label class="layui-form-label">欢迎语</label>
						    <div class="layui-input-block">
						    	<input type="text" value="<?php echo ($list["welcome"]); ?>" name="welcome"placeholder="请输入邮箱" class="layui-input">
						    </div>
						</div>
						<div class="layui-form-item">
						<label class="layui-form-label">网站介绍</label>
						    <div class="layui-input-block">
						        <textarea placeholder="请输入网站介绍" name="desc" class="layui-textarea"><?php echo ($list["desc"]); ?>
						        </textarea>
						    </div>
					    </div>
					    <div class="layui-form-item" style="margin-left: 5%;">
						    <div class="layui-input-block">
						    	<button class="layui-btn" lay-submit lay-filter="change1">立即提交</button>
								<!--<button type="reset" class="layui-btn layui-btn-primary">重置</button>-->
						    </div>
						</div>
					</form>
			    </div>
			    <div class="layui-tab-item">
			    	<form class="layui-form">
		    			<div class="layui-form-item layui-form-text">
                            <label class="layui-form-label">网站前台logo</label>
                            <div class="layui-input-block">
                                 <div class="layui-inline">
                            		<div class="layui-input-inline" style="width:550px;">
        								<input type="text" readonly="readonly" value="<?php echo ($list['logo_home']); ?>" name="logo_home" id="upload-logo-url" class="layui-input" style="width:550px" autocomplete="off">
        								<input type="hidden" class="layui-input" value="<?php echo ($list['logo_home']); ?>" name="logo_home" id="upload-logo-url">
        							</div>
        						</div>
        						<div class="layui-inline">
                            		<div class="layui-input-inline">
        								<input  class="log layui-btn layui-btn-primary" value="上传前台logo">
        							</div>
        						</div>
        						<!--<div class="layui-inline">
                            		<div class="layui-input-inline">
        								<input class="layui-upload-file"  id="upload-image">
        							</div>
        						</div>-->
        						<div id="upload-logo-preview" style="margin-top:10px;">
        							<?php if(isset($list['logo_home'])): ?><img src="/yhhq/Public/upload/<?php echo ($list['logo_home']); ?>" style="width:126px;height:96px"><?php endif; ?>
                        		</div>     
                            </div>
                        </div>
                        <div class="layui-form-item layui-form-text">
                            <label class="layui-form-label">网站后台logo</label>
                            <div class="layui-input-block">
                                 <div class="layui-inline">
                            		<div class="layui-input-inline" style="width:550px;">
        								<input type="text" readonly="readonly" value="<?php echo ($list['logo_admin']); ?>" name="logo_admin" id="upload-logo2-url" class="layui-input" style="width:550px" autocomplete="off">
        								<input type="hidden" class="layui-input" value="<?php echo ($list['logo_admin']); ?>" name="logo_admin" id="upload-logo2-url">
        							</div>
        						</div>
        						<div class="layui-inline">
                            		<div class="layui-input-inline">
        								<input  class="log2 layui-btn layui-btn-primary" value="上传后台logo">
        							</div>
        						</div>
        						<!--<div class="layui-inline">
                            		<div class="layui-input-inline">
        								<input class="layui-upload-file"  id="upload-image">
        							</div>
        						</div>-->
        						<div id="upload-logo2-preview" style="margin-top:10px;">
        							<?php if(isset($list['logo_admin'])): ?><img src="/yhhq/Public/upload/<?php echo ($list['logo_admin']); ?>" style="width:126px;height:96px"><?php endif; ?>
                        		</div>     
                            </div>
                        </div>
                        <div class="layui-form-item layui-form-text">
                            <label class="layui-form-label">网站背景图</label>
                            <div class="layui-input-block">
                                 <div class="layui-inline">
                            		<div class="layui-input-inline" style="width:550px;">
        								<input type="text" readonly="readonly" value="<?php echo ($list['background']); ?>" name="background" id="upload-bac-url" class="layui-input" style="width:550px" autocomplete="off">
        								<input type="hidden" class="layui-input" value="<?php echo ($list['background']); ?>" name="background" id="upload-bac-url">
        							</div>
        						</div>
        						<div class="layui-inline">
                            		<div class="layui-input-inline">
        								<input  class="bac layui-btn layui-btn-primary" value="上传背景图">
        							</div>
        						</div>
        						<div id="upload-bac-preview" style="margin-top:10px;">
        							<?php if(isset($list['background'])): ?><img src="/yhhq/Public/upload/<?php echo ($list['background']); ?>" style="width:112px;height:80px"><?php endif; ?>
                        		</div>     
                            </div>
                        </div>
						<div class="layui-form-item" style="margin-left: 5%;">
						    <div class="layui-input-block">
						    	<button class="layui-btn" lay-submit lay-filter="change2">立即提交</button>
								<!--<button type="reset" class="layui-btn layui-btn-primary">重置</button>-->
						    </div>
						</div>
					</form>
			    </div>
			    <div class="layui-tab-item">
	    		<form class="layui-form">
	    		    <blockquote class="layui-elem-quote">
                        <div class="layui-btn layui-btn-small add">
                            <i class="fa fa-plus"></i>&nbsp;&nbsp;添加参数
                        </div>
                    </blockquote>
					<table style="TABLE-LAYOUT: fixed" class="layui-table table-hover">
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>名称</th>
                                <th>APPID</th>
                                <th>KEY</th>
                                <th>SECRET</th>
                                <th>状态</th>
                                <th style="width:15%">操作</th>
                            </tr>
                        </thead>
                            <!--内容容器-->
                        <tbody id="con">
                            <?php if(is_array($res)): $i = 0; $__LIST__ = $res;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><tr class="a_<?php echo ($v["link_id"]); ?>">
                                <td><?php echo ($v["id"]); ?></td>
                                <td style="WORD-WRAP: break-word" width="20"><?php echo ($v["name"]); ?></td>
                                <td style="WORD-WRAP: break-word" width="20"><?php echo ($v["appid"]); ?></td>
                                <td style="WORD-WRAP: break-word" width="20"><?php echo ($v["key"]); ?></td>
                                <td style="WORD-WRAP: break-word" width="20"><?php echo ($v["secret"]); ?></td>
                                <td>
                                <?php if($v["status"] == 1): ?><a class="red" href="javascript:;" onclick="return stateyes('<?php echo ($v["id"]); ?>');" title="已开启">
                                    <div id="zt<?php echo ($v["id"]); ?>">
                                        <button class="layui-btn layui-btn-warm layui-btn-mini">状态开启</button>
                                    </div>
                                </a>
                                <?php else: ?>
                                <a class="red" href="javascript:;" onclick="return stateyes('<?php echo ($v["id"]); ?>');" title="已禁用">
                                    <div id="zt<?php echo ($v["id"]); ?>">
                                        <button class="layui-btn layui-btn-danger layui-btn-mini">状态禁用</button>
                                    </div>
                                </a><?php endif; ?>
                                </td>
                                <td  style="width:15%">
                                    <span data-id="<?php echo ($v["id"]); ?>" class="layui-btn layui-btn-mini edit">编辑</span>
                                    <span onclick="return del('<?php echo ($v["id"]); ?>')" class="layui-btn layui-btn-mini layui-btn-danger">删除</span>
                                </td>
                            </tr><?php endforeach; endif; else: echo "" ;endif; ?>
                            </tbody>
                        </table>
					</form>
			    </div>
			  </div>
			</div>			
	</div>
	</fieldset>
	<script>
    $(function(){		
    	KindEditor.ready(function(K) {
            window.editor = K.create('#editor_id', {
            	uploadJson : "<?php echo U('Upload/upload');?>",
    	        fileManagerJson : "<?php echo U('Upload/manager');?>",
    			allowFileManager : true,
    			afterBlur: function () { this.sync()},
    		});
    	});
    });

</script>
	<script>
	$(function(){		
		var editor = KindEditor.editor({
			uploadJson : "<?php echo U('Admin/Upload/upload');?>",
	        fileManagerJson : "<?php echo U('Admin/Upload/manager');?>",
			allowFileManager : true,
			afterUpload : function(url, data) {
			}
		});
		
		function delepic(obj){
			alert(1);
			if (confirm("确认要删除？")) {
				var $thisob=$(obj);
				var $liobj=$thisob.parent();
				var picurl=$liobj.children('input').val();
				$.post("<?php echo U('Upload/del');?>",{pic:picurl},function(m){
					if(m=='1') {
						$liobj.remove();
						$("#upload-image-url").val("");
					} else {
						alert("删除失败");
					}
				},"html");	
			}
		}
		
		$(".log").click(function() {
			editor.loadPlugin("image", function() {
				editor.plugin.imageDialog({
					tabIndex : 1,
					imageUrl : $("#upload-logo-url").val(),
					clickFn : function(url) {
						editor.hideDialog();
						var val = url;
						console.log(url);
						if(url.toLowerCase().indexOf("http://") == -1 && url.toLowerCase().indexOf("https://") == -1) {
							var filename = /images(.*)/.exec(url);
							if(filename && filename[0]) {
								val = filename[0];
							}
						}
						$("#upload-logo-url").val($("#upload-logo-url").val());
						$("#upload-logo-url").val(val);
						$("#upload-logo-preview").html('<li class="imgbox" style="list-type:none">'+
								'<a class="item_close" href="javascript:;" onclick="delpic(this)" title="删除"></a>'+
								'<span class="item_box"> <img src="'+url+'" style="width:124px;height:94px"></span>'+
								'<input type="hidden" name="logo_home" value="'+val+'" />'+
								'</li>');
						}
					});
				});
			});
			
			$(".log2").click(function() {
			editor.loadPlugin("image", function() {
				editor.plugin.imageDialog({
					tabIndex : 1,
					imageUrl : $("#upload-logo2-url").val(),
					clickFn : function(url) {
						editor.hideDialog();
						var val = url;
						console.log(url);
						if(url.toLowerCase().indexOf("http://") == -1 && url.toLowerCase().indexOf("https://") == -1) {
							var filename = /images(.*)/.exec(url);
							if(filename && filename[0]) {
								val = filename[0];
							}
						}
						$("#upload-logo2-url").val($("#upload-logo2-url").val());
						$("#upload-logo2-url").val(val);
						$("#upload-logo2-preview").html('<li class="imgbox" style="list-type:none">'+
								'<a class="item_close" href="javascript:;" onclick="delpic(this)" title="删除"></a>'+
								'<span class="item_box"> <img src="'+url+'" style="width:124px;height:94px"></span>'+
								'<input type="hidden" name="logo_admin" value="'+val+'" />'+
								'</li>');
						}
					});
				});
			});
			
			$(".bac").click(function() {
			editor.loadPlugin("image", function() {
				editor.plugin.imageDialog({
					tabIndex : 1,
					imageUrl : $("#upload-bac-url").val(),
					clickFn : function(url) {
						editor.hideDialog();
						var val = url;
						console.log(url);
						if(url.toLowerCase().indexOf("http://") == -1 && url.toLowerCase().indexOf("https://") == -1) {
							var filename = /images(.*)/.exec(url);
							if(filename && filename[0]) {
								val = filename[0];
							}
						}
						$("#upload-bac-url").val($("#upload-bac-url").val());
						$("#upload-bac-url").val(val);
						$("#upload-bac-preview").html('<li class="imgbox" style="list-type:none">'+
								'<a class="item_close" href="javascript:;" onclick="delpic(this)" title="删除"></a>'+
								'<span class="item_box"> <img src="'+url+'" style="width:126px;height:96px"></span>'+
								'<input type="hidden" name="background" value="'+val+'" />'+
								'</li>');
						}
					});
				});
			});
			
		});
layui.use(['upload','form','layer','element'], function(){
  var $ = layui.jquery
  ,element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块
  var form = layui.form(), layer = layui.layer;
  //触发事件
  var active = {
    tabAdd: function(){
      //新增一个Tab项
      element.tabAdd('demo', {
        title: '新选项'+ (Math.random()*1000|0) //用于演示
        ,content: '内容'+ (Math.random()*1000|0)
        ,id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
      })
    }
    ,tabDelete: function(othis){
      //删除指定Tab项
      element.tabDelete('demo', '44'); //删除：“商品管理”
      
      
      othis.addClass('layui-btn-disabled');
    }
    ,tabChange: function(){
      //切换到指定Tab项
      element.tabChange('demo', '22'); //切换到：用户管理
    }
  };
  
  $('.site-demo-active').on('click', function(){
    var othis = $(this), type = othis.data('type');
    active[type] ? active[type].call(this, othis) : '';
  });
  
  //Hash地址的定位
  var layid = location.hash.replace(/^#test=/, '');
  element.tabChange('test', layid);
  
  element.on('tab(test)', function(elem){
    location.hash = 'test='+ $(this).attr('lay-id');
  });
  
});
</script>
<script>
    layui.use('form', function(){
        var form = layui.form();
        form.on('submit(change1)', function(data){
        	//console.log(data);return;
            $.ajax({
                type: "POST",
                url: '<?php echo U("edit");?>',
                data: data.field,
                success: function(msg){
                    if( msg.code == 1 ){
                        location.reload();
                    }else{
                        layer.msg(msg.msg, {
                            icon: 5,
                            shade: [0.6, '#393D49'],
                            time:1500
                        });
                    }
                }
            });
            return false;
        });
        
        form.on('submit(change2)', function(data){
        	//console.log(data);return;
            $.ajax({
                type: "POST",
                url: '<?php echo U("edit");?>',
                data: data.field,
                success: function(msg){
                    if( msg.code == 1 ){
                        location.reload();
                    }else{
                        layer.msg(msg.msg, {
                            icon: 5,
                            shade: [0.6, '#393D49'],
                            time:1500
                        });
                    }
                }
            });
            return false;
        });

    });
    
    
</script>

</div>
<script src="/yhhq/Public/kindeditor/kindeditor-all-min.js"></script>

</body>
</html>