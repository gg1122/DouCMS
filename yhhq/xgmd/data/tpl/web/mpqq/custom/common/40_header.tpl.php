<?php defined('IN_IA') or exit('Access Denied');?>﻿<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('common/header-base', TEMPLATE_INCLUDEPATH)) : (include template('common/header-base', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="./resource/mpqq/public_notice.css">
<div class="main">
<section>
    <div class="section_main">
    <div class="section_auto">
				<?php  if(defined('IN_MESSAGE')) { ?>
		
       <style type="text/css">
  .page_error_msg .inner {
text-align: center;
padding-top: 50px;
}

.icon_page_error {
background: url("./resource/mpqq/images/page_error.png") 0 0 no-repeat;
width: 180px;
height: 140px;
vertical-align: middle;
display: inline-block;
}  


.page_error_msg {
width: 500px;

}
.page_error_msg h4 {
line-height: 30px;
font-weight: 400;
font-style: normal;
font-size: 16px;
}

</style>
<div class="page_error_msg">
    <div class="inner">
        <span class="icon_wrp">
              <i class="icon_page_error">
                                <i style="margin-top: 20px; color:#FBC15E;" class="fa fa-4x fa-<?php  if($label=='success') { ?>check-circle<?php  } ?><?php  if($label=='danger') { ?>times-circle<?php  } ?><?php  if($label=='info') { ?>info-circle<?php  } ?><?php  if($label=='warning') { ?>exclamation-triangle<?php  } ?>"></i>
                            </i>
        </span>
        <div class="msg_content">
            <?php  if(is_array($msg)) { ?>
            <h3>MYSQL 错误：</h3>
            <h4><?php  echo cutstr($msg['sql'], 300, 1);?></h4>
            <h4><b><?php  echo $msg['error']['0'];?> <?php  echo $msg['error']['1'];?>：</b><?php  echo $msg['error']['2'];?></h4>
            <?php  } else { ?>
            <h2><?php  echo $caption;?></h2>
            <h4><?php  echo $msg;?></h4>
            <?php  } ?>
            <?php  if($redirect) { ?>
            <p><a href="<?php  echo $redirect;?>" class="alert-link">如果你的浏览器没有自动跳转，请点击此链接</a></p>
            <script type="text/javascript">
                setTimeout(function () {
                    location.href = "<?php  echo $redirect;?>";
                }, 3000);
            </script>
            <?php  } else { ?>
            <p>[<a href="javascript:history.go(-1);" class="alert-link">返回上一页</a>] &nbsp; [<a href="./?refresh" class="alert-link">首页</a>]</p>
            <?php  } ?>
        </div>
    </div>
</div>		
		<?php  } else { ?>
        <div class="content_nav ui_wrapper"> <h2 class="section_title"></h2> </div>
          <div class="ui_tab_contents">
        <?php  } ?>
	
    	<!--左边导航-->

<script src="./resource/mpqq/cuman.js"></script>
<script>
	
$(function(){
	
	$("#menuBar dl").first().addClass("no_extra");

	$("#menuBar dd").click(function(){

		$("#menuBar dd").removeClass("selected");
		$(this).addClass("selected");

	});

});
	
</script>
<script type="text/javascript">
						require(['bootstrap'], function(){
							$('.ext-type').click(function(){
								var id = $(this).data('id');
								util.cookie.del('ext_type');
								util.cookie.set('ext_type', id, 8640000);
								location.reload();
								return false;
							});

							$('#search-menu input').keyup(function() {
								var a = $(this).val();
								$('.aside_main .aside_dl .aside_nav, .aside_main .aside_dl .aside_dt,.aside_main .aside_group').hide();
								$('.aside_main .aside_dl .aside_nav').each(function() {
									$(this).css('border-left', '0');
									if(a.length > 0 && $(this).attr('kw').indexOf(a) >= 0) {
                                        $(this).parents(".aside_group").show();
										$(this).parents(".aside_group").find('.aside_dt').show();
										$(this).show().css('border-left', '4px #428bca outset');
                                        $(this).show().css('margin-left', '2px');
                                    
									}
								});
								if(a.length == 0) {
								$('.aside_main .aside_dl .aside_nav, .aside_main .aside_dl .aside_dt,.aside_main .aside_group').show();
								}
							});
						});
</script>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       