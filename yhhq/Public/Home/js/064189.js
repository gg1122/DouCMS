$(function(){
	imgLazyloadLib();
	//代码创建一个遮罩层，用于做加载动画
	//setScroll();
	setEventListen();
})
$(window).load(function(){
	diyAutoHeight();
	imgLazyloadLib();
});
$(window).resize(function(){
	if(window.resizeTimeout)window.clearTimeout(window.resizeTimeout);
	window.resizeTimeout=setTimeout(function(){
		diyAutoHeight();
	},350);
});
function imgLazyloadLib(obj){
	if(obj){
		obj.lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}else{
		$("img").lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}
}
var scrollTime=300;
function setEventListen(){
	$(".ev_c_scrollTop").click(function(){
		//滚动到顶部
		//$("html").getNiceScroll().resize();
		//$("html").getNiceScroll(0).doScrollTop(0);
		$("html,body").stop().animate({scrollTop:"0px"},window.scrollTime);
	});
	$(".ev_c_scrollView").click(function(){
		//鼠标点击：滚动到模块位置
		var settings=settingsLib($(this));
		var viewid=settings.getSetting('eventSet.scrollView');
		if($("#"+viewid).length>0){
			//$("html").getNiceScroll().resize();
			//$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
			$("html,body").stop().animate({scrollTop:$("#"+viewid).offset().top+"px"},window.scrollTime);
		}
	});
	$(".ev_c_showView").click(function(){
		//鼠标点击：显示模块
		showEventView($(this));
	});
	$(".ev_c_hidView").click(function(){
		//鼠标点击：隐藏模块
		hidEventView($(this));
	});
	$(".ev_c_tabView").click(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".ev_m_tabView").hover(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".view").click(function(){
		$(this).children(".view_contents").addClass("diyCurTab");
		var settings=settingsLib($(this));
		var unitViewSet=settings.getSetting('unitViewSet');
		if(unitViewSet&&unitViewSet.length>0){
			for(key in unitViewSet){
				$("#"+unitViewSet[key]).children(".view_contents").removeClass("diyCurTab");
			}
		}
	});
}
function showHidEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!showViews)showViews=new Array();
	if(!hidViews)hidViews=new Array();
	var doubleKey=new Array();
	//获取重复值
	if(showViews.length>0){
		for(s_key in showViews){
			if(hidViews.length>0){
				for(h_key in hidViews){
					if(showViews[s_key]==hidViews[h_key]){
						doubleKey.push(showViews[s_key]);
					}
				}
			}
		}
	}
	//隐藏
	if(hidViews.length>0){
		for(key in hidViews){
			if($.inArray(hidViews[key],doubleKey)<0){
				$("#"+hidViews[key]).css({"display":"none"});
				diyAutoHeight($("#"+hidViews[key]));
			}
		}
	}
	//显示
	if(showViews.length>0){
		for(key in showViews){
			if($.inArray(showViews[key],doubleKey)<0){
				$("#"+showViews[key]).css({"display":"block"});
				diyAutoHeight($("#"+showViews[key]));
			}
		}
	}
	//双向显示
	if(doubleKey.length>0){
		for(key in doubleKey){
			if($("#"+doubleKey[key]).length>0){
				if($("#"+doubleKey[key]).is(":hidden")){
					$("#"+doubleKey[key]).css({"display":"block"});
					diyAutoHeight($("#"+doubleKey[key]));
				}else{
					$("#"+doubleKey[key]).css({"display":"none"});
					diyAutoHeight($("#"+doubleKey[key]));
				}
			}
		}
	}
}
function showEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	if(!showViews)showViews=new Array();
	if(showViews.length>0){
		for(key in showViews){
			$("#"+showViews[key]).css({"display":"block"});
			diyAutoHeight($("#"+showViews[key]));
		}
	}
}
function hidEventView(obj){
	var settings=settingsLib(obj);
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!hidViews)hidViews=new Array();
	if(hidViews.length>0){
		for(key in hidViews){
			$("#"+hidViews[key]).css({"display":"none"});
			diyAutoHeight($("#"+hidViews[key]));
		}
	}
}
function getPageScrollTop(){
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
function getNowPage(){
	var width=$(window).width();
	var max_width=window.DIY_PAGE_SIZE;
	max_width=parseFloat(max_width);
	if(isNaN(max_width))max_width=1200;
	if(width>=max_width){
		return 'pc';
	}else if(width>=640){
		return 'pad';
	}else{
		return 'mobile';
	}
}
$(window).scroll(function(){
    var scrollTop=getPageScrollTop();
    var nowPage=getNowPage();
    if($(".scrollToTop_"+nowPage).length>0){
    	$(".scrollToTop_"+nowPage).each(function(){
    		var old_top=$(this).attr("old_top_"+nowPage);
    		var old_left=$(this).attr("old_left_"+nowPage);
    		var old_width=$(this).attr("old_width_"+nowPage);
    		if(!old_top||old_top==""){
    			old_top=$(this).offset().top;
    			$(this).attr("old_top_"+nowPage,old_top);
    		}
    		if(!old_left||old_left==""){
    			old_left=$(this).offset().left;
    			$(this).attr("old_left_"+nowPage,old_left);
    		}
    		if(!old_width||old_width==""){
    			old_width=$(this).width();
    			$(this).attr("old_width_"+nowPage,old_width);
    		}
    		old_top=parseFloat(old_top);
    		old_left=parseFloat(old_left);
    		old_width=parseFloat(old_width);
    		if(scrollTop>=old_top){
    			$(this).css({"position":"fixed","z-index":9999999,"top":"0px","width":old_width+"px","left":old_left+"px"});
    			$(this).parents(".view").css({"z-index":9999999});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":"visible"});
    			$(this).parents(".layout").css({"z-index":9999999});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":"visible"});
    		}else{
    			$(this).css({"position":"","z-index":"","top":"","width":"","left":""});
    			$(this).parents(".view").css({"z-index":""});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":""});
    			$(this).parents(".layout").css({"z-index":""});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":""});
    			$(this).attr("old_top_"+nowPage,null);
    			$(this).attr("old_left_"+nowPage,null);
    			$(this).attr("old_width_"+nowPage,null);
    		}
    	});
    }
});
function diyAutoHeight(obj){
	if(obj&&obj.length>0){
		//针对选项卡做特殊处理
		if(obj.children(".view_contents").children("form").length>0){
			if(obj.children(".view_contents").children("form").children(".view").length>0){
				obj.children(".view_contents").children("form").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").length>0){
			if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").length>0){
				obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else{
			diyAutoHeightDo(obj);
		}
	}else{
		setTimeout(function(){
			$(".view").each(function(){
				if(!$(this).hasClass("includeBlock")){
					diyAutoHeightDo($(this));
				}
			});
		},500);
	}
}
function diyAutoHeightFatherDo(father,obj){
	var settings=settingsLib(father);
	var autoHeight=settings.getSetting('autoHeight');
	if(autoHeight&&autoHeight=="true"){
		//开启了允许自动高度
		var minHeight=obj.offset().top+obj.height()-father.offset().top;
		if(obj.siblings(".view").length>0){
			obj.siblings(".view").each(function(){
				if($(this).is(":visible")){
					var tempHeight=$(this).offset().top+$(this).height()-father.offset().top;
					if(tempHeight>minHeight){
						minHeight=tempHeight;
					}
				}
			});
		}
		father.css({"height":minHeight+"px"});
		diyAutoHeightDo(father);
	}
}
function diyAutoHeightDo(obj){
	if(obj.is(":visible")){
		var father=obj.parents(".view").first();
		if(father.length<=0)father=obj.parents(".layout").first();
		if(father.length>0){
			var settings=settingsLib(father);
			var autoHeight=settings.getSetting('autoHeight');
			if(autoHeight&&autoHeight=="true"){
				if(father.offset().top+father.height()<obj.offset().top+obj.height()){
					father.css({"height":(obj.offset().top+obj.height()-father.offset().top)+"px"});
					diyAutoHeightDo(father);
				}else{
					diyAutoHeightFatherDo(father,obj);
				}
			}
		}
	}
}
function setScroll(){
	if(typeof($("html").niceScroll)=="function"){
		$("html").niceScroll({zindex:99999,cursoropacitymax:0.8,cursoropacitymin:0.3,horizrailenabled:false,mousescrollstep:60,smoothscroll:true});	
	}else{
		setTimeout(setScroll,500);
	}
}
var settingsLib=function(view){
	var main={
		view:null,
		setup:function(obj){
			if(window.viewsSettings&&window.viewsSettings[obj.attr("id")]){
				this.init(window.viewsSettings[obj.attr("id")]);
				this.view=obj;
			}else{
				this.init({});
			}
		},
		init:function(obj){
			if(typeof(obj)=='object'){
				this.settings=obj;
			}else if(obj!=""){
				eval('if(typeof('+obj+')=="object"){this.settings='+obj+';}else{this.settings={};}');
			}else{
				this.settings={};
			}
		},
		setSetting:function(k,v){
			if(!this.settings){
				this.settings={};	
			}
			var keyArray=k.split(".");
      		var val='this.settings';
			for (key in keyArray){
				if(keyArray[key]&&keyArray[key]!=''){
					if(eval(val+'["'+keyArray[key]+'"]')){
						val=val+'["'+keyArray[key]+'"]';
					}else{
						eval(val+'["'+keyArray[key]+'"]={}');
						val=val+'["'+keyArray[key]+'"]';
					}
				}
			}
			if(v==null){
				eval("delete "+val);		
			}else{
				eval(val+"=v");
			}
		},
		getSetting:function(key){
			if(!this.settings){
				this.settings={};	
			}
			if(key){
				var keyArray=key.split(".");
				var val='this.settings';
				for (key in keyArray){
					if(keyArray[key]&&keyArray[key]!=''){
						if(eval(val+'["'+keyArray[key]+'"]')){
							val=val+'["'+keyArray[key]+'"]';
							continue;
						}else{
							val=null;
							break;
						}
					}
				}
				return eval(val);
			}else{
				return this.settings;	
			}
		},
		saveSettings:function(obj){
			if(typeof(obj)=="object"&&this.settings&&obj.hasClass("view")){
				window.viewsSettings[obj.attr("id")]=this.settings;
			}else if(this.view&&typeof(this.view)=="object"&&this.settings&&this.view.hasClass("view")){
				window.viewsSettings[this.view.attr("id")]=this.settings;
			}
		}
	};
	if(view){
		main.view=view;
		main.setup(view);	
	}
	return main;
}

function GetUrlPara(){
	var url = document.location.toString();
	var arrUrl = url.split("?");
	var paras='';
	if(arrUrl.length>1){
		var para = arrUrl[1];
		var arrUrl2=para.split("&");
		arrUrl2.forEach(function(e){
			if(e.indexOf("mod=")>=0||e.indexOf("act=")>=0||e.indexOf("#")>=0){
				 return;  
			}else{
				paras+=e+"&";
			}
		})
	}
	return paras;
}

function RequestURL(viewid, sys_url, moreParams){
	//var serverUrl = 'http://'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
	var serverUrl = "";
	var settings = settingsLib($("#"+viewid));
	var params = "";
	if(settings && settings.getSetting("data")){
		$.each(settings.getSetting("data"), function(key, val){
			if($.isArray(val)){
				$.each(val, function(key2, val2){
					params += "&"+key+"[]="+val2;
				});
			}else{
				params += "&"+key+"="+val;
			}
		});
		if(params) serverUrl += params;
	}
	var params2 = GetUrlPara();
	if(params2) serverUrl += "&" + params2;
	if(moreParams) serverUrl += "&" + moreParams;
	var scriptString = "<scr"+"ipt type='text/javascript' src="+serverUrl+"></scr"+"ipt>";
	//$.ajaxSettings.async = false; 
	$.ajax({
	  dataType: 'json',
	  url: serverUrl,
	  xhrFields:{withCredentials:true},
	  success: function(result){
		if(result.error) alert(result.error);
		else{
			if(typeof(history.replaceState) != 'undefined'){
				var obj={};
				var hstate=JSON.stringify(history.state);
				if(hstate!='null'&& hstate!=null){
					eval('var hjson = ' + hstate);
					obj=hjson;
				}
				var key="moreParams"+viewid;
				obj[key]=moreParams;
				//var strparam=viewid+":"+moreParams;
				//history.replaceState({("moreParams"+viewid):moreParams},"","");
				history.replaceState(obj,"","");
			}
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).children(".view_contents").show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	}});
	setTimeout(function(){commDefault_isFT();},500);
	function commDefault_isFT(){
		var based_Obj= document.getElementById("based");
		var currentlang_Obj= document.getElementById("currentlang");//当前语言
		console.log(Request('chlang'))
		$(function(){
			if (based_Obj){
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				switch( Request('chlang') ){
					case "cn-tw":
						BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
						delCookie(JF_cn);
						SetCookie(JF_cn, BodyIsFt, 7);
						break; 
					case "cn":
					case "en": 
						BodyIsFt= 0; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 0, 7);
						currentlang_Obj.innerHTML = "简体中文";
						break;
					case "tw": 
						BodyIsFt= 1; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 1, 7);
						currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
						break;
					default: 
						if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
							if(getCookie(JF_cn)==null){
								BodyIsFt= 1;
								SetCookie(JF_cn, 1, 7);
								break;
							}
						}
						BodyIsFt= parseInt(getCookie(JF_cn));
				}	
				if(BodyIsFt===1){
					StranBody();
					document.title = StranText(document.title);
				}else{
					StranBodyce();
					document.title = StranTextce(document.title);
				}
			}else{
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				//if(Default_isFT){
					BodyIsFt= 1; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 1, 7);
					StranBody();
					document.title = StranText(document.title);
				//}else{
					//BodyIsFt= 0; 
					//delCookie(JF_cn);
					//SetCookie(JF_cn, 0, 7);
					/*StranBodyce();
					document.title = StranTextce(document.title);*/
				//}
			}
			
		});
	}
	/*
	$.getJSON(serverUrl, function(result){
		if(result.error) alert(result.error);
		else{
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	});*/
	//$("#"+viewid).append(scriptString);
}
//导航公共监听函数
function setDhListen(style,obj,params){
	var father=$(obj).parents(".dh").first();
	if(father.length>0){
		switch(style){
			case 'style_01':
				father.find(".miniMenu").toggleClass("Mslide");
	            if($("body").css("position")=="relative"){
	                $("body").css({"position":"fixed","width":"100%"});
	            }else{
	                $("body").css({"position":"relative","width":"100%"});
	            }
				break;
			case 'style_02':
				if(params=="open"){
					father.find(".Style_02_miniMenu .menuMain").css("display","block");
				}else{
					father.find(".Style_02_miniMenu .menuMain").css("display","none");
				}
				break;
			case 'style_03':
				if(params=="mobi_more"){
					$(obj).parent().siblings(".mobi_menuUl02").toggle();
				}else if(params=="m_icoFont"){
					$(obj).parents(".mobi_main").hide();
				}else if(params=="mobi_top"){
					$(obj).siblings(".mobi_main").show();
				}
				break;
			case 'style_04':
				var width = $(window).width();
                var newW = width+18;
                father.find(".newWidth").css("width",newW);
                father.find(".miniMenu").toggleClass("Mslide");
                if($("body").css("position")=="relative"){
                    $("body").css({"position":"fixed","width":"100%"});
                }else{
                    $("body").css({"position":"relative","width":"100%"});
                }
				break;
		}
	}
}
//-------------选项卡-----------------------------------------------
//鼠标左右拖拽事件
function setScroll_Choice(tabId){
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
	if(typeof($(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll)=="function"){
		$(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll({zIndex:99999,cursoropacitymax:0,cursoropacitymin:0,horizrailenabled:true,autohidemode:true,touchbehavior:true});
	}else{
		setTimeout(setScroll_Choice,500);
	}
}

/*鼠标悬浮效果*/
function setHover_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('hover');
	$(".tab_nav .tab_li", $("#"+tabId)).hover(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*鼠标点击效果*/
function setClick_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('click');
	$(".tab_nav .tab_li", $("#"+tabId)).click(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*自动播放*/
function setAnimat_int(tabId,time){
	if(!time)time=5;
	time=time*1000;
	var viewid=tabId.substr(4);

	if(!window.tabConfigAnimat)window.tabConfigAnimat={};
	//初始化
	window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);

	$("#"+viewid).mousemove(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseover(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseout(function(){
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	});

	function doAnimat(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
		var index=$(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index=index+1;
		if(index>=$(".tab_nav .tab_li", $("#"+tabId)).length){
			index=0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	}
}
//获取鼠标拖拽区域的总宽度
function tab_style03_init(tabId){
	var total=0;
	var obj=$(".tab_li", $("#"+tabId));
	$(".tab_li", $("#"+tabId)).each(function(){
		total+=$(this).width();
	});
	$(".tab_ul_top", $("#"+tabId)).css("width",total+"px");
	$(".tab_ul_bottom", $("#"+tabId)).css("width",total+"px");

	//向左滚动图标事件
	$(".tab_left_arrow", $("#"+tabId)).unbind('click');
	$(".tab_left_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index = index-1;
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
	});

	//向右滚动图标事件
	$(".tab_right_arrow", $("#"+tabId)).unbind('click');
	$(".tab_right_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		var len = $(".tab_nav .tab_li").length;
		index = index+1;
		if(index >= len){
			index = 0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
	});
	setScroll_Choice(tabId);
}
function StranBody(fobj){
//	var obj= fobj ? fobj.childNodes : document.body.childNodes;
//	for(var i=0;i<obj.length;i++){
//		var OO=obj.item(i);
//		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
//		if(OO.title!=""&&OO.title!=null)OO.title=StranText(OO.title);
//		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranText(OO.alt);
//		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranText(OO.value);
//		if(OO.nodeType==3){OO.data=StranText(OO.data)}
//		else StranBody(OO)
//	}
//	
//	try{
//		var based_Obj2= document.getElementById("based2");
//		if(!based_Obj2) { //简繁
//			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
//		}else{ //简繁英
//			based_Obj.innerHTML = "繁体中文";
//			based_Obj2.innerHTML = "简体中文";
//		}
//	}catch(e){}
}
function StranBodyce(fobj){
//	var obj= fobj ? fobj.childNodes : document.body.childNodes;
//	for(var i=0;i<obj.length;i++){
//		var OO=obj.item(i);
//		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
//		if(OO.title!=""&&OO.title!=null)OO.title=StranTextce(OO.title);
//		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranTextce(OO.alt);
//		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranTextce(OO.value);
//		if(OO.nodeType==3){OO.data=StranTextce(OO.data)}
//		else StranBodyce(OO)
//	}
//	try{
//		var based_Obj2= document.getElementById("based2");
//		if(!based_Obj2) { //简繁
//			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
//		}else{ //简繁英
//			based_Obj.innerHTML = "繁体中文";
//			based_Obj2.innerHTML = "简体中文";
//		}
//	}catch(e){}
}
function StranText(txt){
	if(txt==""||txt==null)return "";
	return Traditionalized(txt);
}
function StranTextce(txt){
	if(txt==""||txt==null)return "";
	return Traditionalizedce(txt);
}
function JTPYStr(){
	return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄标适态于';
}
function FTPYStr(){
	return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩標適態於';
}
function Traditionalized(cc){
	var str='',ss=JTPYStr(),tt=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function Traditionalizedce(cc){
	var str='',tt=JTPYStr(),ss=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function _RequestParamsStr(){
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf('?');
	var strRight = strHref.substr(intPos+1);
	return strRight;
}

function Request(strName){
	var arrTmp = _RequestParamsStr().split("&");
	for(var i=0,len=arrTmp.length; i<len; i++){ 
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()){
		if(arrTemp[1].indexOf("#")!=-1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
			return arrTemp[1]; 
		}
	}
	return "";
}

function SetCookie(name,value,hours){
	var hourstay = 30*24*60*60*1000; //此 cookie 将被默认保存 30 天
	if(checkNum(hours)){
		hourstay = hours;
	}
    var exp  = new Date();
    exp.setTime(exp.getTime() + hourstay*60*60*1000);
    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){     
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function checkNum(nubmer){
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
    if (re.test(nubmer))return true;
	return false;
}

DIY_PAGE_SIZE='1200';



$(document).ready(function(){
	/*
	**当前模块对象：$("#dh_style_01_1493261042562")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#dh_style_01_1493174594932")
	**效果仅在发布预览下才生效
	*/
	
})



$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1483925413345")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_06_1483925660550")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493714684460")
	**效果仅在发布预览下才生效
	*/
	
})



$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1492672600589")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1492672703274")
	**效果仅在发布预览下才生效
	*/
	
})
$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1492672334480")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493713593793")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493713593814")
	**效果仅在发布预览下才生效
	*/
	
})
$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1493713593362")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493713642252")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493713642265")
	**效果仅在发布预览下才生效
	*/
	
})
$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1493713642067")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493716298457")
	**效果仅在发布预览下才生效
	*/
	
})



$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493719262841")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493719262853")
	**效果仅在发布预览下才生效
	*/
	
})
$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1493719262350")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493724052332")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493724052350")
	**效果仅在发布预览下才生效
	*/
	
})
$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1493724052007")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493724063725")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493724063733")
	**效果仅在发布预览下才生效
	*/
	
})
$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1493724063277")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493724077087")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493724077095")
	**效果仅在发布预览下才生效
	*/
	
})
$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1493724075503")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493725261518")
	**效果仅在发布预览下才生效
	*/
	
})




$(document).ready(function(){
	/*
	**当前模块对象：$("#productList_style_07_1493866215909")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#productList_style_07_1493867666330")
	**效果仅在发布预览下才生效
	*/
	
})



$(document).ready(function(){
	/*
	**当前模块对象：$("#productList_style_07_1493867762715")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#productList_style_07_1493867762735")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1493726318862")
	**效果仅在发布预览下才生效
	*/
	
})



$(document).ready(function(){
	/*
	**当前模块对象：$("#newsList_style_04_1493726340772")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#newsList_style_04_1493802336793")
	**效果仅在发布预览下才生效
	*/
	
})
var viewsSettings={"comm_layout_header":{"css":{"mobile":{"height":"104px","z-index":10},"pc":{"height":"117px","z-index":5,"top":"0px"},"pad":{"height":"117px","z-index":"999"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#24282e"}}}},"settingsBox":{"showTitle":"null\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"diyShowName":"\u5171\u4eab\u5934\u90e8","autoHeight":"true"},"div_includeBlock_1493085289858":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"117px","position":"absolute","top":"-0px","left":"calc(50% - 600px)","z-index":9},"pad":{"width":"96%","left":"2.014846235418876%","height":"117px"},"mobile":{"width":"100%","height":"104px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"qqol_style_01_1493171865277":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"qqOnLineConfig","setupFunc":"qqOnLineSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"QQ\u5728\u7ebf\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"QQ\u5728\u7ebf","styleKind":"AAA","styleHelpId":1284,"viewCtrl":"default","css":{"pc":{"width":"17.5%","position":"absolute","top":"50px","left":"26.875%"},"pad":{"width":"201px","left":"13.712016574585636%","top":"43px"},"mobile":{"width":"57.85123966942148%","top":"97px","left":"25.020559210526315%","display":"none"},"content":{"overflow":"visible"}},"lock":{"height":"true"},"name":"qqol","kind":"\u5176\u5b83\u5de5\u5177","showname":"QQ\u5728\u7ebf","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"},"data":{"qqolList":["{\"item-type\":\"qq\",\"item-name\":\"QQ\",\"qq\":\"123456\",\"qq-icon\":\"52\",\"qq-text\":\"\u5ba2\u670dQQ\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u670d\u52a1\u70ed\u7ebf:0756-3268XXX\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"Email\uff1acouple@qq.com\"}"],"width":"170","color_base":"#fc3158","border_width":"2","hide":"on"}},"image_logo_1493705330418":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageLogoConfig","setupFunc":"logoSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"LOGO\u5c5e\u6027\u8bbe\u7f6e"},"style":"logo","styleKind":"LOGO","styleHelpId":1252,"viewCtrl":"logo","css":{"pc":{"width":"16.666666666666664%","height":"83px","position":"absolute","top":"17px","left":"0%"},"pad":{"left":"0%","width":"21.43646408839779%","top":"17px"},"mobile":{"width":"200px","height":"83px","top":"10.5px","left":"2.631578947368421%"}},"data":{"logoType":1,"logoStyle":"2","logoBlank":"_self"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","diyShowName":"LOGO","eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"dh_style_01_1493261042562":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","viewCtrl":"default","css":{"pc":{"width":"68.16666666666666%","z-index":"999","position":"absolute","top":"14px","left":"26.875%","display":"none"},"pad":{"z-index":"999","display":"none"},"mobile":{"width":"12.105263157894736%","z-index":"999","top":"30px","left":"85.26315789473684%","display":"block"},"content":{"overflow":"visible"},"customCss":{"mobile":{"@icoMenuSet":{"color":"#ffffff"},"%hot>a":{"color":"#ee0548","background":"transparent"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"dhOpen":""},"moveEdit":[]},"dh_style_01_1493174594932":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u81ea\u5b9a\u98ce\u683c6","styleKind":"\u81ea\u5b9a\u4e49\u98ce\u683c\uff08\u5bfc\u822a\u83dc\u5355\uff09","viewCtrl":"default","css":{"pc":{"width":"49.916666666666664%","z-index":"999","position":"absolute","top":"46px","left":"50.083333333333336%"},"pad":{"z-index":"999","width":"590px","left":"34.806629834254146%","top":"36.5px"},"mobile":{"width":"96.00000000000001%","z-index":"999","top":"88px","left":"1.999999999999993%","display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"@mainMenuSet":{"text-align":"center","font-size":"16px","font-weight":"normal","color":"#ffffff","line-height":"30px","font-family":"Microsoft YaHei"},"%hot>a":{"color":"#fc3158","background-repeat":"no-repeat","background-position-x":"50%","background-position-y":"100%","line-height":"25px","font-weight":"normal","background":" url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/nav_hover.png)"},"@columnSet":{"background-repeat":"no-repeat"},"@mainMenuSet:hover":{"color":"#fc3158","line-height":"25px","background-position-x":"50%","background-position-y":"100%","background-repeat":"no-repeat","background":" url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/nav_hover.png)"},"@columnSet:hover":{"background":" url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/nav_hover.png)"}},"mobile":{"@mainMenuSet":{"color":"#ffffff","line-height":"45px","text-align":"left"},"%hot>a":{"color":"#fb5710","background-position-y":"50%","line-height":"45px","text-align":"left","background-position-x":"75%"},"@mainMenuSet:hover":{"line-height":"45px","background-position-x":"75%","background-position-y":"50%"},"@icoMenuSet":{"color":"#fb5710"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"styleShowImg":"\/sysTools\/Model\/views\/dh\/z_dh_06\/viewData\/showImg.png","styleShowClass":"one","isDiyView":"1","data":{"dhOpen":""}},"layout_1493085228712":{"css":{"pc":{"height":"623px"},"content":{"overflow":"visible"},"pad":{"height":"525px"},"mobile":{"height":"336px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"banner_style_01_1493707509530":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"bannerConfig","setupFunc":"bannerSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u8f6e\u64ad\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u8f6e\u64ad\u56fe-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u56fe\u7247\u8f6e\u64ad","styleHelpId":1256,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"623px","position":"absolute","top":"0px","left":"0%"},"pad":{"width":"100%","height":"525px","left":"0%"},"mobile":{"width":"768px","height":"336px","top":"0px","left":"calc(50% - 384px)"}},"doubleClickFunc":"bannerViewSelect","mouseMenu":[{"name":"\u7f16\u8f91\u8f6e\u64ad\u56fe","func":"bannerViewSelect()","ico":"fa-file-image-o"}],"params":{"filelist":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_banner1.jpg,\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_banner2.jpg,\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_banner3.jpg,","textlist":",,,","urllist":",,,"},"name":"banner","kind":"\u56fe\u7247\u8f6e\u64ad","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1492658132965":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"135px","position":"absolute","top":"244px","left":"calc(50% - 600px)","z-index":2},"pad":{"height":"145px","left":"2%","top":"190px","width":"96%"},"mobile":{"width":"100%","height":"110px","top":"113px","left":"0%","z-index":2},"customCss":{"pc":{"modelArea":{"border-top-color":"#8cc040","border-right-color":"#8cc040","border-bottom-color":"#8cc040","border-left-color":"#e67e22","border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-style":"none","border-left-width":"5px","border-bottom-width":"2px","border-right-width":"2px","border-top-width":"2px","background":"transparent"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"flipInX","duration":"1.2","delay":"0.3","iteration":"1","offset":"0"},"moveEdit":[]},"text_style_02_1483925413345":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"0px","left":"0%","z-index":7},"pad":{"left":"0%","top":"17px"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","line-height":"67px","height":"67px","font-size":"40px","color":"#ffffff","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"5px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"34px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"50px","height":"50px","text-align":"center"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_06_1483925660550":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_06","diyShowName":"\u6587\u5b57\u6a21\u5757-\u9ed1\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"SimHei","position":"absolute","top":"85px","left":"0%","z-index":7},"pad":{"left":"calc(50% - 452.5px)","top":"95px"},"mobile":{"width":"100%","top":"50px","left":"0%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#fc3158","font-size":"34px","text-align":"center","letter-spacing":"5px","font-weight":"bold","font-family":"Microsoft YaHei"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","text-align":"center"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1493179029752":{"css":{"pc":{"height":"131px","z-index":3},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"131px"},"mobile":{"height":"84px"},"customCss":{"pc":{"modelArea":{"background":"#f1f1f1"}}}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_02_1493179058959":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"50px","left":"0%"},"pad":[],"mobile":{"width":"100%","top":"20px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"30px","font-family":"Microsoft YaHei","color":"#147efb","text-align":"center","font-weight":"normal","line-height":"40px","height":"50px","letter-spacing":"5px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInDown","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"image_style_01_1493709155037":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"25px","position":"absolute","top":"106px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"25px","top":"59px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/title_line.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInUp","duration":"1.2","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"layout_1493714652653":{"css":{"pc":{"height":"60px","z-index":2},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#f1f1f1"}}},"pad":{"height":"60px"},"mobile":{"height":"198px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_01_1493714684460":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"10px","left":"0%","z-index":3},"pad":[],"mobile":{"width":"96%","top":"23px","left":"1.9736842105263157%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#646464","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"zoomIn","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"layout_1493088777731":{"css":{"pc":{"height":"530px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"@view_contents":{"background":"transparent"},"modelArea":{"background":"#f1f1f1"}}},"mobile":{"height":"671px"},"pad":{"height":"466px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1492672334480":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"360px","height":"490px","position":"absolute","top":"40px","left":"0%","z-index":2},"pad":{"height":"426px","width":"30%","left":"2%","top":"40px"},"mobile":{"width":"98%","height":"218px","top":"24px","left":"1.0526315789473684%"},"customCss":{"pc":{"modelArea":{"background":"#ffffff  url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service.png)","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%","background-position-y":"50%"},"modelArea:hover":{"background":"#ffffff url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_hover.png)","background-size":"cover","background-position-x":"50%","background-position-y":"50%","box-shadow":"#a6a6a6 0px 0px 20px "}},"mobile":{"modelArea":{"background":"#ffffff  url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_phone.png)","background-repeat":"no-repeat"},"modelArea:hover":{"background":"#ffffff  url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_phone.png)"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"autoHeight":"false","params":{"animate":"bounceInLeft","duration":"1.2","delay":"0.8","iteration":"1","offset":"0"},"moveEdit":[]},"image_style_01_1493710669508":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"50px","position":"absolute","top":"71px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"52px","height":"50px"},"mobile":{"width":"40%","height":"50px","top":"23px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_planning.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_01_1492672600589":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"166px","left":"0%","z-index":3},"pad":{"left":"0%","top":"127.46875px"},"mobile":{"width":"40%","top":"83px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#382d44","font-weight":"bold","border-bottom-style":"none","border-bottom-width":"1px","font-style":"italic"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","letter-spacing":"0px","font-style":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_blank_1493710753324":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"18%","height":"3px","position":"absolute","top":"212px","left":"41%"},"pad":{"left":"39.96797703180212%","width":"20%","top":"166.96875px"},"mobile":{"width":"15%","height":"5px","top":"120px","left":"12.634408602150538%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ee0548"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1492672703274":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"248px","left":"10%","z-index":3},"pad":{"left":"10.054107773851591%","top":"197px"},"mobile":{"width":"53.494623655913976%","top":"18px","left":"42.2422372611465%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#646464","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_06_1493710979548":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_06","diyShowName":"\u6587\u5b57\u6a21\u5757-\u9ed1\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"132px","font-size":"46px","color":"#333","line-height":"50px","font-family":"SimHei","position":"absolute","top":"380px","left":"calc(50% - 66px)"},"pad":{"left":"26.998674911660775%","width":"130px","top":"320px"},"mobile":{"width":"30%","top":"142px","left":"5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","color":"#646464","text-align":"center","line-height":"46px","letter-spacing":"1px","font-family":"Microsoft YaHei"},"modelArea":{"border-top-color":"#ee0548","border-right-color":"#ee0548","border-bottom-color":"#ee0548","border-left-color":"#ee0548","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"1px","border-right-width":"1px","border-bottom-width":"1px","border-left-width":"1px","border-top-left-radius":"100px","border-bottom-left-radius":"100px","border-bottom-right-radius":"100px","border-top-right-radius":"100px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"showtarget":"1","selectVal":64193}},"div_includeBlock_1493713593362":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"30%","height":"490px","position":"absolute","top":"40px","left":"35%","z-index":2},"pad":{"height":"426px","width":"30%","left":"35%","top":"40px"},"mobile":{"width":"98%","height":"215px","top":"240px","left":"1%"},"customCss":{"pc":{"modelArea":{"background":"#ffffff  url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service.png)","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%","background-position-y":"50%"},"modelArea:hover":{"background":"#ffffff url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_hover.png)","background-size":"cover","background-position-x":"50%","background-position-y":"50%","box-shadow":"#a6a6a6 0px 0px 20px "}},"mobile":{"modelArea":{"background":"#ffffff  url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_phone.png)","background-repeat":"no-repeat"},"modelArea:hover":{"background":"#ffffff  url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_phone.png)"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"autoHeight":"false","params":{"animate":"bounceInLeft","duration":"1.2","delay":"0.7","iteration":"1","offset":"0"},"moveEdit":[]},"text_style_01_1493713593793":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"166px","left":"0%","z-index":3},"pad":{"left":"0%","top":"127.46875px"},"mobile":{"width":"40%","top":"83px","left":"59.82022849462365%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#382d44","font-weight":"bold","border-bottom-style":"none","border-bottom-width":"1px","font-style":"italic"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","letter-spacing":"0px","font-style":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_blank_1493713593808":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"18%","height":"3px","position":"absolute","top":"212px","left":"41%"},"pad":{"left":"39.96797703180212%","width":"20%","top":"166.96875px"},"mobile":{"width":"15%","height":"5px","top":"120px","left":"72.5596438172043%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ee0548"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"}},"text_style_06_1493713593824":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_06","diyShowName":"\u6587\u5b57\u6a21\u5757-\u9ed1\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"132px","font-size":"46px","color":"#333","line-height":"50px","font-family":"SimHei","position":"absolute","top":"380px","left":"calc(50% - 66px)"},"pad":{"left":"26.998674911660775%","width":"130px","top":"320px"},"mobile":{"width":"30%","top":"142px","left":"64.86055107526882%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","color":"#646464","text-align":"center","line-height":"46px","letter-spacing":"1px","font-family":"Microsoft YaHei"},"modelArea":{"border-top-color":"#ee0548","border-right-color":"#ee0548","border-bottom-color":"#ee0548","border-left-color":"#ee0548","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"1px","border-right-width":"1px","border-bottom-width":"1px","border-left-width":"1px","border-top-left-radius":"100px","border-bottom-left-radius":"100px","border-bottom-right-radius":"100px","border-top-right-radius":"100px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"showtarget":"1","selectVal":64187}},"image_style_01_1493713593776":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"24px","position":"absolute","top":"84px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"64.5px","height":"25px"},"mobile":{"width":"40%","height":"25px","top":"43px","left":"59.87483198924731%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_clothes.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_01_1493713593814":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"248px","left":"10%","z-index":3},"pad":{"left":"10.054107773851591%","top":"197px"},"mobile":{"width":"50%","top":"15px","left":"8.543988853503185%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#646464","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1493713642067":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"30%","height":"490px","position":"absolute","top":"40px","left":"70%","z-index":2},"pad":{"height":"426px","width":"30%","left":"68%","top":"40px"},"mobile":{"width":"98%","height":"214px","top":"457px","left":"0.9991776315789473%"},"customCss":{"pc":{"modelArea":{"background":"#ffffff  url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service.png)","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%","background-position-y":"50%"},"modelArea:hover":{"background":"#ffffff url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_hover.png)","background-size":"cover","background-position-x":"50%","background-position-y":"50%","box-shadow":"#a6a6a6 0px 0px 20px "}},"mobile":{"modelArea":{"background":"#ffffff  url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_phone.png)","background-repeat":"no-repeat"},"modelArea:hover":{"background":"#ffffff  url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_phone.png)"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"autoHeight":"false","params":{"animate":"bounceInLeft","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"},"moveEdit":[]},"text_style_01_1493713642252":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"166px","left":"0%","z-index":3},"pad":{"left":"0%","top":"127.46875px"},"mobile":{"width":"40%","top":"83px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#382d44","font-weight":"bold","border-bottom-style":"none","border-bottom-width":"1px","font-style":"italic"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","letter-spacing":"0px","font-style":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_blank_1493713642257":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"18%","height":"3px","position":"absolute","top":"212px","left":"41%"},"pad":{"left":"39.96797703180212%","width":"20%","top":"166.96875px"},"mobile":{"width":"15%","height":"5px","top":"120px","left":"12.634408602150538%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ee0548"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1493713642265":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"248px","left":"10%","z-index":3},"pad":{"left":"10.054107773851591%","top":"197px"},"mobile":{"width":"53.503184713375795%","top":"14px","left":"42.1327627388535%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#646464","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_06_1493713642271":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_06","diyShowName":"\u6587\u5b57\u6a21\u5757-\u9ed1\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"132px","font-size":"46px","color":"#333","line-height":"50px","font-family":"SimHei","position":"absolute","top":"380px","left":"calc(50% - 66px)"},"pad":{"left":"26.998674911660775%","width":"130px","top":"320px"},"mobile":{"width":"30%","top":"142px","left":"5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","color":"#646464","text-align":"center","line-height":"46px","letter-spacing":"1px","font-family":"Microsoft YaHei"},"modelArea":{"border-top-color":"#ee0548","border-right-color":"#ee0548","border-bottom-color":"#ee0548","border-left-color":"#ee0548","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"1px","border-right-width":"1px","border-bottom-width":"1px","border-left-width":"1px","border-top-left-radius":"100px","border-bottom-left-radius":"100px","border-bottom-right-radius":"100px","border-top-right-radius":"100px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"showtarget":"1","selectVal":64194}},"image_style_01_1493713642247":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"57px","position":"absolute","top":"67.5px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"48.5px","height":"57px"},"mobile":{"width":"40%","height":"57px","top":"17px","left":"0.05460349462365591%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_service_chat.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"layout_1493714899271":{"css":{"pc":{"height":"50px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#f1f1f1"}}},"pad":{"height":"50px"},"mobile":{"height":"30px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"layout_1493715692515":{"css":{"pc":{"height":"478px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"519px"},"mobile":{"height":"922px"},"customCss":{"pc":{"modelArea":{"background":" url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_aboutUs.jpg)","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%","background-position-y":"50%","background-attachment":"fixed"}}}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"text_style_02_1493715692522":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"50px","left":"0%"},"pad":[],"mobile":{"width":"100%","top":"20px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"30px","font-family":"Microsoft YaHei","color":"#ffffff","text-align":"center","font-weight":"normal","line-height":"40px","height":"50px","letter-spacing":"5px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInDown","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"image_style_01_1493715692547":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"25px","position":"absolute","top":"106px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"25px","top":"59px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/title_line_white.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInUp","duration":"1.2","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_01_1492670438163":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"150px","left":"10%"},"pad":[],"mobile":{"width":"96.00000000000001%","top":"100px","left":"1.9%","z-index":2},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"30px","text-align":"left","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#ffffff","text-indent":"2em"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#ffffff"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"zoomIn","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"}},"layout_1493716281218":{"css":{"pc":{"height":"131px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"131px"},"mobile":{"height":"84px"},"customCss":{"pc":{"modelArea":{"background":"#ffffff"}}}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_02_1493716281222":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"50px","left":"0%"},"pad":[],"mobile":{"width":"100%","top":"20px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"30px","font-family":"Microsoft YaHei","color":"#147efb","text-align":"center","font-weight":"normal","line-height":"40px","height":"50px","letter-spacing":"5px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInLeft","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"image_style_01_1493716281241":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"25px","position":"absolute","top":"106px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"25px","top":"59px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/title_line.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInRight","duration":"1.2","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"layout_1493716298455":{"css":{"pc":{"height":"60px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#ffffff"}}},"pad":{"height":"60px"},"mobile":{"height":"170px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_01_1493716298457":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"10px","left":"0%","z-index":3},"pad":[],"mobile":{"width":"96%","top":"20px","left":"1.9736842105263157%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#646464","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"bounceInDown","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"layout_1493716311658":{"css":{"pc":{"height":"343px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"269px"},"mobile":{"height":"335px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"image_style_04_1493190308035":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_04","diyShowName":"\u56fe\u7247\u2014\u76f8\u518c","styleShowName":"\u98ce\u683c4","styleKind":"\u56fe\u7247\u7ec4","styleHelpId":1255,"viewCtrl":"photo","css":{"pc":{"width":"100%","position":"absolute","top":"40px","left":"0%"},"pad":{"width":"96%","left":"2.014846235418876%"},"mobile":{"width":"96.00000000000001%","top":"25px","left":"1.999999999999993%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"background":"transparent"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"prodznumpc":"1","prodznum":"1","prodhnumpc":"4","prodhnum":"4","prodnum":"4","newPicScale":"1:1","prodhnumpad":"4"},"params":{"filelist":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/case_1.jpg,\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/case_2.jpg,\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/case_3.jpg,\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/case_4.jpg,","textlist":",,,,","urllist":",,,,","animate":"bounceInUp","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"},"moveEdit":[]},"layout_1493716733700":{"css":{"pc":{"height":"76px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"50px"},"pad":{"height":"76px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_06_1493717805760":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_06","diyShowName":"\u6587\u5b57\u6a21\u5757-\u9ed1\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"11%","font-size":"46px","color":"#333","line-height":"50px","font-family":"SimHei","position":"absolute","top":"30px","left":"44.5%"},"pad":{"width":"15%","left":"42.52386002120891%"},"mobile":{"width":"30%","top":"20px","left":"35%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","color":"#646464","text-align":"center","line-height":"46px","letter-spacing":"1px","font-family":"Microsoft YaHei"},"modelArea":{"border-top-color":"#ee0548","border-right-color":"#ee0548","border-bottom-color":"#ee0548","border-left-color":"#ee0548","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"1px","border-right-width":"1px","border-bottom-width":"1px","border-left-width":"1px","border-top-left-radius":"100px","border-bottom-left-radius":"100px","border-bottom-right-radius":"100px","border-top-right-radius":"100px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"rotateIn","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"},"data":{"showtarget":"1","selectVal":64187}},"layout_1493717814068":{"css":{"pc":{"height":"45px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"30px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"layout_1493718214061":{"css":{"pc":{"height":"409px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"395px"},"mobile":{"height":"580px"},"customCss":{"pc":{"modelArea":{"background":" url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_advantage_bg.jpg)","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%","background-position-y":"50%"}}}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"text_style_02_1493718214065":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"50px","left":"0%"},"pad":[],"mobile":{"width":"100%","top":"20px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"30px","font-family":"Microsoft YaHei","color":"#ffffff","text-align":"center","font-weight":"normal","line-height":"40px","height":"50px","letter-spacing":"5px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","letter-spacing":"3px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInRight","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"image_style_01_1493718214090":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"25px","position":"absolute","top":"106px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"25px","top":"61px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/title_line_white.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInLeft","duration":"1.2","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"div_includeBlock_1493719262350":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"25%","height":"234px","position":"absolute","top":"174px","left":"0%","z-index":2},"pad":{"height":"189px","width":"24%","left":"1.9999337221633087%","top":"152px"},"mobile":{"width":"47%","height":"228px","top":"100px","left":"2%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"autoHeight":"false","params":{"animate":"slideInUp","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"},"moveEdit":[]},"image_style_01_1493719262818":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"50px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"0px","height":"50px"},"mobile":{"width":"100%","height":"50px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_team.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_01_1493719262841":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"67px","left":"0%","z-index":3},"pad":{"left":"0%","top":"68.46875px"},"mobile":{"width":"100%","top":"64px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#ffffff","font-weight":"normal","border-bottom-style":"none","border-bottom-width":"1px","font-style":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","letter-spacing":"0px","font-style":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_01_1493719262853":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"109px","left":"10%","z-index":3},"pad":{"left":"5.012444690265487%","top":"114px","width":"90%"},"mobile":{"width":"100%","top":"103px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#cccccc","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1493724052007":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"25%","height":"234px","position":"absolute","top":"174px","left":"25%","z-index":2},"pad":{"height":"189px","width":"24%","left":"25.965999469777305%","top":"152px"},"mobile":{"width":"47%","height":"228px","top":"100px","left":"51%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"autoHeight":"false","params":{"animate":"slideInDown","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"},"moveEdit":[]},"image_style_01_1493724052317":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"50px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"0px","height":"50px"},"mobile":{"width":"100%","height":"50px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_project.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_01_1493724052332":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"67px","left":"0%","z-index":3},"pad":{"left":"0%","top":"68.46875px"},"mobile":{"width":"100%","top":"64px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#ffffff","font-weight":"normal","border-bottom-style":"none","border-bottom-width":"1px","font-style":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","letter-spacing":"0px","font-style":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_01_1493724052350":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"109px","left":"10%","z-index":3},"pad":{"left":"5.012444690265487%","top":"114px","width":"90%"},"mobile":{"width":"100%","top":"103px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#cccccc","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1493724063277":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"25%","height":"209px","position":"absolute","top":"174px","left":"50%","z-index":2},"pad":{"height":"189px","width":"24%","left":"49.932065217391305%","top":"152px"},"mobile":{"width":"47%","height":"203px","top":"342px","left":"1.9970703125%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"autoHeight":"false","params":{"animate":"slideInUp","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"},"moveEdit":[]},"image_style_01_1493724063707":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"50px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"0px","height":"50px"},"mobile":{"width":"100%","height":"50px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_cp.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_01_1493724063725":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"67px","left":"0%","z-index":3},"pad":{"left":"0%","top":"68.46875px"},"mobile":{"width":"100%","top":"64px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#ffffff","font-weight":"normal","border-bottom-style":"none","border-bottom-width":"1px","font-style":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","letter-spacing":"0px","font-style":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_01_1493724063733":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"109px","left":"10%","z-index":3},"pad":{"left":"5.012444690265487%","top":"114px","width":"90%"},"mobile":{"width":"100%","top":"103px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#cccccc","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1493724075503":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"25%","height":"209px","position":"absolute","top":"174px","left":"75%","z-index":2},"pad":{"height":"189px","width":"24%","left":"73.89813096500531%","top":"152px"},"mobile":{"width":"47%","height":"203px","top":"342px","left":"50.99609375000001%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"autoHeight":"false","params":{"animate":"slideInDown","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"},"moveEdit":[]},"image_style_01_1493724077061":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"50px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","top":"0px","height":"50px"},"mobile":{"width":"100%","height":"50px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_cooperation.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_01_1493724077087":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"67px","left":"0%","z-index":3},"pad":{"left":"0%","top":"68.46875px"},"mobile":{"width":"100%","top":"64px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#ffffff","font-weight":"normal","border-bottom-style":"none","border-bottom-width":"1px","font-style":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","letter-spacing":"0px","font-style":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_01_1493724077095":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"109px","left":"10%","z-index":3},"pad":{"left":"5.012444690265487%","top":"114px","width":"90%"},"mobile":{"width":"100%","top":"103px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#cccccc","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1493725252028":{"css":{"pc":{"height":"131px","z-index":3},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"131px"},"mobile":{"height":"84px"},"customCss":{"pc":{"modelArea":{"background":"#f1f1f1"}}}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_02_1493725252030":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"50px","left":"0%"},"pad":[],"mobile":{"width":"100%","top":"20px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"30px","font-family":"Microsoft YaHei","color":"#147efb","text-align":"center","font-weight":"normal","line-height":"40px","height":"50px","letter-spacing":"5px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"rotateInDownRight","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"image_style_01_1493725252049":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"25px","position":"absolute","top":"106px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"25px","top":"59px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/title_line.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"rotateInUpLeft","duration":"1.2","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"layout_1493725261516":{"css":{"pc":{"height":"60px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#f1f1f1"}}},"pad":{"height":"60px"},"mobile":{"height":"173px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_01_1493725261518":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"10px","left":"0%","z-index":3},"pad":[],"mobile":{"width":"96%","top":"23px","left":"1.9736842105263157%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#646464","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"lightSpeedIn","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"layout_1493190308003":{"css":{"pc":{"height":"328px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"511px"},"mobile":{"height":"630px"},"customCss":{"pc":{"modelArea":{"background":"#f1f1f1"}}}},"diyShowName":"\u9879\u76ee\u6848\u4f8b","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"tab_style_03_1493725591982":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"tabConfig","setupFunc":"tabSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u9009\u9879\u5361\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u9009\u9879\u5361-\u9ed8\u8ba4","styleShowName":"\u9ed8\u8ba4\u98ce\u683c","styleKind":"\u9009\u9879\u5361","viewCtrl":"default3","isInclude":"3","css":{"pc":{"width":"67.41666666666667%","height":"303px","position":"absolute","top":"25px","left":"0%"},"mobile":{"width":"100%","height":"717px","top":"0px","left":"0%","display":"none"},"customCss":{"pc":{"@tabItemSet":{"background":"#ffffff","font-size":"14px","border-top-color":"#ee0548","border-right-color":"#ee0548","border-bottom-color":"#ee0548","border-left-color":"#ee0548","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","color":"#ee0548","padding-left":"5px","padding-right":"5px"},"modelArea":{"background":"transparent","border-top-color":"#dddddd","border-right-color":"#dddddd","border-bottom-color":"#dddddd","border-left-color":"#dddddd","border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-style":"none","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px"},"@tabCurItem":{"background":"#47c667","color":"#ffffff"},"@tabconSet":{"background":"transparent","border-top-color":"#06c647","border-top-style":"none","border-top-width":"2px"},"@tabItemSet@tabCurItem":{"background":"#ee0548"}}},"pad":{"height":"421px","left":"2%"}},"name":"tab","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u9009\u9879\u5361","eventSet":{"scrollView":"none","type":"none"},"data":{"tabtexttype":"center","tabtextset":"0","tabimgwidth":"","tabwidth":"105","tabname":["\u793c\u670d","\u9996\u9970"],"slidetype":"0","tabtextmargin":"10","tabimg":["\/sysTools\/Model\/viewsRes\/publish\/img\/comm\/tabImg.png","\/sysTools\/Model\/viewsRes\/publish\/img\/comm\/tabImg.png"],"tabheight":"40"},"autoHeight":"true","params":{"animate":"bounceInRight","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"}},"productList_style_07_1493866215909":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"prodListConfig","setupFunc":"prodListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u4ea7\u54c1\u5217\u8868-\u98ce\u683c7","styleShowName":"\u98ce\u683c7","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/productList_style_7.png","styleShowClass":"one","styleKind":"AAA","styleHelpId":1269,"viewCtrl":"default","css":{"pc":{"width":"100%","left":"0%","top":"25px","position":"absolute"},"pad":{"width":"100%"},"mobile":{"width":"96%","top":"25px","left":"1.9736842105263157%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@btnaSet":{"background":"#ee0548"},"@titleSet":{"font-size":"16px","padding-bottom":"10px"},"@detailSet":{"font-size":"14px","margin-bottom":"15px"}},"pad":{"@titleSet":{"color":"#ee0548"},"@modSet:hover#@titleSet":{"color":"#ffffff"},"@modSet:hover#@detailSet":{"color":"#e5e5e5"}},"mobile":{"@titleSet":{"color":"#ee0548"}}}},"lock":{"height":"true"},"prodhnum":"4","prodhnumpad":"4","prodhnummobile":"2","prodznum":"3","picscale":"1:1","prodtitle":"true","prodpic":"true","prodintro":"true","prodpage":"true","prodprice":"true","prodstock":"true","arr_ProdShow":{"pic":"\u56fe\u7247","title":"\u6807\u9898","page":"\u5206\u9875","price":"\u4ef7\u683c","intro":"\u7b80\u4ecb","stock":"\u6309\u94ae"},"name":"productList","kind":"\u4ea7\u54c1\u6a21\u5757","showname":"\u4ea7\u54c1\u5217\u8868","eventSet":{"scrollView":"none","type":"none"},"data":{"prodnum":"3","prodhnumpc":"3","prodhnum":"3","pshow":["pic","title","intro"],"gids":[69822],"prodhnumpad":"3","prodIntroNum":{"pc":null,"pad":"35","mobile":"30"},"prodsort":"idasc","showat":64191}},"productList_style_07_1493867666330":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"prodListConfig","setupFunc":"prodListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u4ea7\u54c1\u5217\u8868-\u98ce\u683c7","styleShowName":"\u98ce\u683c7","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/productList_style_7.png","styleShowClass":"one","styleKind":"AAA","styleHelpId":1269,"viewCtrl":"default","css":{"pc":{"width":"100%","left":"0%","top":"25px","position":"absolute"},"pad":{"width":"100%"},"mobile":{"width":"96%","top":"0px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@btnaSet":{"background":"#ee0548"},"@titleSet":{"font-size":"16px","padding-bottom":"10px"},"@detailSet":{"font-size":"14px","margin-bottom":"15px"}},"pad":{"@titleSet":{"color":"#ee0548"},"@modSet:hover#@titleSet":{"color":"#ffffff"},"@modSet:hover#@detailSet":{"color":"#e5e5e5"}},"mobile":{"@titleSet":{"color":"#ee0548"}}}},"lock":{"height":"true"},"prodhnum":"4","prodhnumpad":"4","prodhnummobile":"2","prodznum":"3","picscale":"1:1","prodtitle":"true","prodpic":"true","prodintro":"true","prodpage":"true","prodprice":"true","prodstock":"true","arr_ProdShow":{"pic":"\u56fe\u7247","title":"\u6807\u9898","page":"\u5206\u9875","price":"\u4ef7\u683c","intro":"\u7b80\u4ecb","stock":"\u6309\u94ae"},"name":"productList","kind":"\u4ea7\u54c1\u6a21\u5757","showname":"\u4ea7\u54c1\u5217\u8868","eventSet":{"scrollView":"none","type":"none"},"data":{"prodnum":"3","prodhnumpc":"3","prodhnum":"3","pshow":["pic","title","intro"],"gids":[69823],"prodhnumpad":"3","prodIntroNum":{"pc":null,"pad":"35","mobile":"30"},"showat":64191}},"tab_style_03_1493867762002":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"tabConfig","setupFunc":"tabSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u9009\u9879\u5361\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u9009\u9879\u5361-\u9ed8\u8ba4","styleShowName":"\u9ed8\u8ba4\u98ce\u683c","styleKind":"\u9009\u9879\u5361","viewCtrl":"default3","isInclude":"3","css":{"pc":{"width":"67.41666666666667%","height":"779px","position":"absolute","top":"10px","left":"0%","display":"none"},"mobile":{"width":"96%","height":"605px","top":"25px","left":"1.9736842105263157%","display":"block"},"customCss":{"pc":{"@tabItemSet":{"background":"#ffffff","font-size":"14px","border-top-color":"#ee0548","border-right-color":"#ee0548","border-bottom-color":"#ee0548","border-left-color":"#ee0548","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","color":"#ee0548","padding-left":"5px","padding-right":"5px"},"modelArea":{"background":"transparent","border-top-color":"#dddddd","border-right-color":"#dddddd","border-bottom-color":"#dddddd","border-left-color":"#dddddd","border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-style":"none","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px"},"@tabCurItem":{"background":"#47c667","color":"#ffffff"},"@tabconSet":{"background":"transparent","border-top-color":"#06c647","border-top-style":"none","border-top-width":"2px"},"@tabItemSet@tabCurItem":{"background":"#ee0548"}}},"pad":{"height":"778px","display":"none"}},"name":"tab","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u9009\u9879\u5361","eventSet":{"scrollView":"none","type":"none"},"data":{"tabtexttype":"center","tabtextset":"0","tabimgwidth":"","tabwidth":"105","tabname":["\u793c\u670d","\u9996\u9970"],"slidetype":"0","tabtextmargin":"10","tabimg":["\/sysTools\/Model\/viewsRes\/publish\/img\/comm\/tabImg.png","\/sysTools\/Model\/viewsRes\/publish\/img\/comm\/tabImg.png"],"tabheight":"40"},"autoHeight":"true"},"productList_style_07_1493867762715":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"prodListConfig","setupFunc":"prodListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u4ea7\u54c1\u5217\u8868-\u98ce\u683c7","styleShowName":"\u98ce\u683c7","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/productList_style_7.png","styleShowClass":"one","styleKind":"AAA","styleHelpId":1269,"viewCtrl":"default","css":{"pc":{"width":"100%","left":"0%","top":"25px","position":"absolute"},"pad":{"width":"100%"},"mobile":{"width":"96%","top":"25px","left":"1.9736842105263157%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@btnaSet":{"background":"#ee0548"},"@titleSet":{"font-size":"16px","padding-bottom":"10px"},"@detailSet":{"font-size":"14px","margin-bottom":"15px"}},"pad":{"@titleSet":{"color":"#ee0548"},"@modSet:hover#@titleSet":{"color":"#ffffff"},"@modSet:hover#@detailSet":{"color":"#e5e5e5"}},"mobile":{"@titleSet":{"color":"#ee0548","font-size":"16px"},"@modSet:hover#@titleSet":{"color":"#ffffff"},"@modSet:hover#@detailSet":{"color":"#e5e5e5"}}}},"lock":{"height":"true"},"prodhnum":"4","prodhnumpad":"4","prodhnummobile":"2","prodznum":"3","picscale":"1:1","prodtitle":"true","prodpic":"true","prodintro":"true","prodpage":"true","prodprice":"true","prodstock":"true","arr_ProdShow":{"pic":"\u56fe\u7247","title":"\u6807\u9898","page":"\u5206\u9875","price":"\u4ef7\u683c","intro":"\u7b80\u4ecb","stock":"\u6309\u94ae"},"name":"productList","kind":"\u4ea7\u54c1\u6a21\u5757","showname":"\u4ea7\u54c1\u5217\u8868","eventSet":{"scrollView":"none","type":"none"},"data":{"prodnum":"4","prodhnumpc":"3","prodhnum":"3","pshow":["pic","title","intro"],"gids":[69822],"prodhnumpad":"3","prodIntroNum":{"pc":null,"pad":"35","mobile":"25"},"prodsort":"idasc","showat":64191}},"productList_style_07_1493867762735":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"prodListConfig","setupFunc":"prodListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u4ea7\u54c1\u5217\u8868-\u98ce\u683c7","styleShowName":"\u98ce\u683c7","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/productList_style_7.png","styleShowClass":"one","styleKind":"AAA","styleHelpId":1269,"viewCtrl":"default","css":{"pc":{"width":"100%","left":"0%","top":"25px","position":"absolute"},"pad":{"width":"100%"},"mobile":{"width":"96%","top":"25px","left":"2.054794520547945%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@btnaSet":{"background":"#ee0548"},"@titleSet":{"font-size":"16px","padding-bottom":"10px"},"@detailSet":{"font-size":"14px","margin-bottom":"15px"}},"pad":{"@titleSet":{"color":"#ee0548"},"@modSet:hover#@titleSet":{"color":"#ffffff"},"@modSet:hover#@detailSet":{"color":"#e5e5e5"}},"mobile":{"@titleSet":{"color":"#ee0548"},"@modSet:hover#@titleSet":{"color":"#ffffff"},"@modSet:hover#@detailSet":{"color":"#e5e5e5"}}}},"lock":{"height":"true"},"prodhnum":"4","prodhnumpad":"4","prodhnummobile":"2","prodznum":"3","picscale":"1:1","prodtitle":"true","prodpic":"true","prodintro":"true","prodpage":"true","prodprice":"true","prodstock":"true","arr_ProdShow":{"pic":"\u56fe\u7247","title":"\u6807\u9898","page":"\u5206\u9875","price":"\u4ef7\u683c","intro":"\u7b80\u4ecb","stock":"\u6309\u94ae"},"name":"productList","kind":"\u4ea7\u54c1\u6a21\u5757","showname":"\u4ea7\u54c1\u5217\u8868","eventSet":{"scrollView":"none","type":"none"},"data":{"prodnum":"4","prodhnumpc":"3","prodhnum":"3","pshow":["pic","title","intro"],"gids":[69823],"prodhnumpad":"3","prodIntroNum":{"pc":null,"pad":"35","mobile":"30"},"prodTitleNum":{"pc":null,"pad":null,"mobile":"10"},"showat":64191}},"image_style_01_1493868280284":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"30.25%","height":"301px","position":"absolute","top":"25px","left":"69.75%"},"pad":{"width":"247px","left":"71.79215270413573%","height":"302px","top":"90px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"749px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/homepage_product.jpg","imgStyle":{"pc":"3","pad":null,"mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInLeft","duration":"1.2","delay":"0.6","iteration":"1","offset":"0","filelist":"","urllist":""}},"layout_1493868573981":{"css":{"pc":{"height":"40px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"30px"},"customCss":{"mobile":{"modelArea":{"background":"#f9f9f9"}},"pc":{"modelArea":{"background":"#f9f9f9"}}},"pad":{"height":"140px","display":"none"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"layout_1493726529234":{"css":{"pc":{"height":"203px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"190px"},"mobile":{"height":"190px"},"customCss":{"pc":{"modelArea":{"background":" url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/txt_bg.jpg)","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%","background-position-y":"50%"}}}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"text_style_02_1493726529238":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"50px","left":"0%"},"pad":[],"mobile":{"width":"76.84210526315789%","top":"25px","left":"11.578947368421053%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"36px","font-family":"Microsoft YaHei","color":"#ffffff","text-align":"left","font-weight":"normal","line-height":"40px","height":"50px","letter-spacing":"3px","padding-left":"150px"}},"pad":{"@view_contents":{"box-sizing":"border-box","padding-left":"107px","font-size":"32px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","text-align":"center","padding-left":"0px","height":"60px","line-height":"30px","letter-spacing":"3px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInUp","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"image_style_01_1493726915944":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"9.416666666666666%","height":"33px","position":"absolute","top":"50px","left":"73.20833333333333%","z-index":2},"pad":{"top":"55px","left":"80.52425768822906%"},"mobile":{"width":"28.947368421052634%","height":"33px","top":"57px","left":"71.05263157894737%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/flower_left.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1493726855442":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"9.416666666666666%","height":"33px","position":"absolute","top":"50px","left":"3.2916666666666665%","z-index":2},"pad":{"left":"1.9999337221633087%","top":"55px"},"mobile":{"width":"28.947368421052634%","height":"33px","top":"57px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/flower_right.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1493727001532":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"123px","left":"0%"},"pad":{"left":"calc(50% - 471.5px)","top":"112px"},"mobile":{"width":"90%","top":"107px","left":"5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"28px","font-family":"Microsoft YaHei","color":"#ffffff","text-align":"right","font-weight":"normal","line-height":"40px","height":"50px","letter-spacing":"3px","padding-left":"0px","padding-right":"150px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","letter-spacing":"0px","height":"70px","padding-right":"0px","text-align":"center"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInUp","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"layout_1493726305698":{"css":{"pc":{"height":"131px","z-index":3},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"131px"},"mobile":{"height":"84px"},"customCss":{"pc":{"modelArea":{"background":"#ffffff"}}}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_02_1493726305703":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"50px","left":"0%"},"pad":[],"mobile":{"width":"100%","top":"20px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"30px","font-family":"Microsoft YaHei","color":"#147efb","text-align":"center","font-weight":"normal","line-height":"40px","height":"50px","letter-spacing":"5px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"rotateInUpLeft","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"image_style_01_1493726305732":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"25px","position":"absolute","top":"106px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"25px","top":"59px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/title_line.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"rotateInDownRight","duration":"1.2","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"layout_1493726318859":{"css":{"pc":{"height":"60px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#ffffff"}}},"pad":{"height":"60px"},"mobile":{"height":"170px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_01_1493726318862":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"10px","left":"0%","z-index":3},"pad":[],"mobile":{"width":"96%","top":"20px","left":"1.9736842105263157%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px","text-align":"center","font-family":"Microsoft YaHei","letter-spacing":"2px","color":"#646464","font-weight":"normal"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInLeftBig","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"layout_1493726340769":{"css":{"pc":{"height":"494px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"403px"},"mobile":{"height":"626px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1493800895211":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"494px","position":"absolute","top":"0px","left":"0%"},"pad":{"width":"96%","left":"2.014846235418876%","height":"403px"},"mobile":{"width":"100%","height":"646px","top":"756px","left":"0%","display":"none"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"autoHeight":"true"},"newsList_style_04_1493726340772":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsBhj","act":"newListCfg","setupFunc":"newListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u65b0\u95fb\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_04","diyShowName":"\u65b0\u95fb\u5217\u8868-\u98ce\u683c4","styleShowName":"\u98ce\u683c4","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/newsList_style_4.png","styleShowClass":"one","styleKind":"AAA","styleHelpId":1266,"viewCtrl":"newsList","css":{"pc":{"width":"100%","left":"0%","top":"30px","position":"absolute"},"pad":[],"mobile":{"width":"82.63157894736842%","left":"1.499999999999993%","top":"0px"},"customCss":{"pc":{"@detailSet":{"color":"#acacac","font-family":"SimHei","padding-left":"15px","padding-right":"15px","border-bottom-style":"none","text-align":"left","font-size":"14px"},"@titleSet":{"color":"#382d44","font-size":"18px","font-family":"SimHei","text-align":"left","padding-left":"15px","padding-right":"30px","margin-bottom":"16px","margin-top":"20px","text-indent":"0em"},"@modSet":{"background":"#ffffff","padding-bottom":"20px"},"@btnaSet":{"border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-style":"none","background":"#8dc041","color":"#ffffff","font-size":"16px","padding-top":"10px","padding-bottom":"10px","padding-left":"0px","padding-right":"0px","margin-right":"0px"},"@btnaSet:hover":{"color":"#8dc041","background":"#ffffff","border-top-color":"#8dc041","border-top-style":"solid","border-right-color":"#8dc041","border-bottom-color":"#8dc041","border-left-color":"#8dc041","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","line-height":"20px"},"@modSet:hover":{"box-shadow":"#cccccc 0px 0px 12px "},"@sortSet":{"margin-left":"15px","margin-right":"15px","background":"#ee0548"},"@modSet:hover#@titleSet":{"color":"#ee0548"}},"mobile":{"@titleSet":{"font-size":"14px","padding-left":"15px","padding-right":"15px"},"@detailSet":{"padding-left":"5px","padding-right":"5px","line-height":"20px","font-size":"12px"},"@btnaSet":{"font-size":"14px","line-height":"15px"}}}},"lock":{"height":"true"},"params":{"titlenum":10,"detailnum":10,"animate":"fadeIn","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"},"data":{"newsShow":["pic","date","title","kind","summary"],"sort":"id","newsnum":"3","column":1,"titlenum":36,"detailnum":{"pc":"70","pad":"30","mobile":"35"},"showat":64192,"newPicScale":"2:3","newshnumpc":"3","newshnum":"3","newsznumpc":"2","newsznum":"2","newsGids":["all",14389,14390],"newshnumpad":"3"},"newList":{"pic":"\u56fe\u7247","date":"\u65e5\u671f","title":"\u6807\u9898","kind":"\u7c7b\u522b","summary":"\u6458\u8981","page":"\u5206\u9875","article":"\u67e5\u770b\u5168\u6587"},"newshnum":4,"newshnumpad":3,"newshnummobile":2,"newsznum":1,"tnum":10,"dnum":10,"name":"newsList","kind":"\u65b0\u95fb\u6a21\u5757","showname":"\u65b0\u95fb\u5217\u8868","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1493802336493":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"695px","position":"absolute","top":"766px","left":"0%","display":"none"},"pad":{"width":"96%","display":"none"},"mobile":{"width":"100%","height":"626px","top":"0px","left":"0%","display":"block"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"newsList_style_04_1493802336793":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsBhj","act":"newListCfg","setupFunc":"newListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u65b0\u95fb\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_04","diyShowName":"\u65b0\u95fb\u5217\u8868-\u98ce\u683c4","styleShowName":"\u98ce\u683c4","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/newsList_style_4.png","styleShowClass":"one","styleKind":"AAA","styleHelpId":1266,"viewCtrl":"newsList","css":{"pc":{"width":"100%","left":"0%","top":"30px","position":"absolute"},"pad":[],"mobile":{"width":"96%","left":"2.1052631578947367%","top":"25px"},"customCss":{"pc":{"@detailSet":{"color":"#acacac","font-family":"SimHei","padding-left":"15px","padding-right":"15px","border-bottom-style":"none","text-align":"left","font-size":"14px"},"@titleSet":{"color":"#382d44","font-size":"18px","font-family":"SimHei","text-align":"left","padding-left":"15px","padding-right":"30px","margin-bottom":"16px","margin-top":"20px","text-indent":"0em"},"@modSet":{"background":"#ffffff","padding-bottom":"20px"},"@btnaSet":{"border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-style":"none","background":"#8dc041","color":"#ffffff","font-size":"16px","padding-top":"10px","padding-bottom":"10px","padding-left":"0px","padding-right":"0px","margin-right":"0px"},"@btnaSet:hover":{"color":"#8dc041","background":"#ffffff","border-top-color":"#8dc041","border-top-style":"solid","border-right-color":"#8dc041","border-bottom-color":"#8dc041","border-left-color":"#8dc041","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","line-height":"20px"},"@modSet:hover":{"box-shadow":"#cccccc 0px 0px 12px "},"@sortSet":{"margin-left":"15px","margin-right":"15px","background":"#ee0548"},"@modSet:hover#@titleSet":{"color":"#ee0548"}},"mobile":{"@titleSet":{"font-size":"14px","padding-left":"5px","padding-right":"5px"},"@detailSet":{"padding-left":"5px","padding-right":"5px","line-height":"20px","font-size":"12px"},"@btnaSet":{"font-size":"14px","line-height":"15px"},"@sortSet":{"padding-left":"10px","padding-right":"10px","margin-left":"5px","margin-right":"5px"}}}},"lock":{"height":"true"},"params":{"titlenum":10,"detailnum":10,"animate":"bounceInUp","duration":"1.2","delay":"0.6","iteration":"1","offset":"0"},"data":{"newsShow":["pic","date","title","kind","summary"],"sort":"id","newsnum":"4","column":1,"titlenum":36,"detailnum":{"pc":"70","pad":"30","mobile":"30"},"showat":64192,"newPicScale":"2:3","newshnumpc":"3","newshnum":"3","newsznumpc":"2","newsznum":"2","newsGids":["all",14389,14390],"newshnumpad":"3"},"newList":{"pic":"\u56fe\u7247","date":"\u65e5\u671f","title":"\u6807\u9898","kind":"\u7c7b\u522b","summary":"\u6458\u8981","page":"\u5206\u9875","article":"\u67e5\u770b\u5168\u6587"},"newshnum":4,"newshnumpad":3,"newshnummobile":2,"newsznum":1,"tnum":10,"dnum":10,"name":"newsList","kind":"\u65b0\u95fb\u6a21\u5757","showname":"\u65b0\u95fb\u5217\u8868","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1493801536035":{"css":{"pc":{"height":"40px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"1px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"comm_layout_footer":{"diyShowName":"\u5171\u4eab\u5e95\u90e8","css":{"pc":{"height":"467px"},"content":{"overflow":"visible"},"pad":{"height":"874px"},"mobile":{"height":"476px"},"customCss":{"pc":{"modelArea":{"background":" url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/bottom_bg.jpg)","background-size":"cover"}},"mobile":{"modelArea":{"background":" url(\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/bottom_bg.jpg)","background-repeat":"no-repeat","background-position-x":"50%","background-position-y":"0%"}}}},"settingsBox":{"showTitle":"\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1493727507169":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"467px","position":"absolute","top":"0px","left":"calc(50% - 600px)","z-index":2},"pad":{"width":"96%","left":"2.014846235418876%"},"mobile":{"width":"96%","height":"476px","top":"0px","left":"1.9736842105263157%"},"customCss":{"mobile":{"modelArea":{"background-repeat":"no-repeat","background-size":"cover","background":"#3a2e46 undefined"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1493776665141":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"4%","height":"35px","position":"absolute","top":"203.5px","left":"0%","z-index":2},"pad":{"left":"0%","width":"5.856353591160221%","top":"203.5px"},"mobile":{"width":"54px","height":"35px","top":"64px","left":"19.10958904109589%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/phone.png","imgStyle":{"pc":"3","pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1.2","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1493776882411":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"28.249999999999996%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"201px","left":"4.958333333333333%","z-index":2},"pad":{"left":"6.522790055248619%","top":"201px"},"mobile":{"width":"63.51791530944625%","top":"66.5px","left":"35.95034246575343%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","font-family":"Microsoft YaHei","color":"#ffffff","text-align":"left","font-weight":"normal","line-height":"40px","letter-spacing":"3px","padding-left":"0px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","letter-spacing":"2px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInDown","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"image_style_01_1493776504833":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"242px","position":"absolute","top":"100px","left":"0%"},"pad":{"left":"22.451790633608816%","width":"55.09641873278237%"},"mobile":{"width":"100%","height":"200px","top":"122px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/footer_logo.png","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1493776779709":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"3.75%","height":"35px","position":"absolute","top":"203.5px","left":"79.95833333333333%","z-index":2},"pad":{"left":"74.58736187845304%","top":"203.5px"},"mobile":{"width":"13.150684931506849%","height":"35px","top":"350px","left":"19.914383561643838%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/506\/pkgimg\/pkgimg\/pkgimg\/email.png","imgStyle":{"pc":"3","pad":null,"mobile":"3"}},"moveEdit":[],"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInUp","duration":"1.2","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1493776936704":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"15.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"201px","left":"84.5%","z-index":2},"pad":{"left":"79.33701657458563%","top":"201px","width":"187px"},"mobile":{"width":"55.342465753424655%","top":"352.5px","left":"35.92465753424657%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","font-family":"Microsoft YaHei","color":"#ffffff","text-align":"left","font-weight":"normal","line-height":"40px","letter-spacing":"3px","padding-left":"0px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","letter-spacing":"3px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInUp","duration":"1.2","delay":"0.5","iteration":"1","offset":"0"}},"text_style_02_1493777368799":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"407px","left":"0%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"370px","top":"416px","left":"calc(50% - 185px)"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","line-height":"60px","height":"60px","font-size":"18px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_blank_1493777271645":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"100%","height":"60px","position":"absolute","top":"407px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"60px","top":"416px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ffffff"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"}}}