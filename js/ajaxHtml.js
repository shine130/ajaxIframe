/**
* @author shine
* @blog http://blog.ipsfan.com/
* @version 0.1
*/ 
(function($){
	$.fn.ajaxHtml=function(options){
		var defaults={
			loader:"#ajaxHtml",
			menuBtn:"a"
		};
		opts=$.extend(defaults,options);
		var ajaxHtml=$(opts.loader);
		var menuBtn=this.find(opts.menuBtn);
		var deurl=menuBtn.eq(0).attr("href");
		var defaultpage=deurl.slice(0,deurl.length-5);
		menuBtn.bind("click",function(){
			menuBtn.removeClass("hover");
			$(this).addClass("hover");
			var url=$(this).attr("href");
			ajaxHtml.html("正在加载页面...");
			ajaxHtml.load(url+" #page",function(response,status,xhr){
				if(status=="error"){
					ajaxHtml.html("页面不存在");
				};
				if(status=="timeout"){
					ajaxHtml.html("请求超时，请重新检查网络。");
				};
				var href=window.location.href;
				var arr=href.split("?");
				window.history.pushState("","",arr[0]+"?"+url.slice(0,url.length-5));
			});
			return false;
		});

		function pageLoad(){
			var href=window.location.href;
			var arr=href.split("?");
			if(!arr[1]){
				arr[1]=defaultpage;
			};
			ajaxHtml.html("正在加载页面...");
			ajaxHtml.load(arr[1]+'.html #page',function(response,status,xhr){
				if(status=="error"){
					ajaxHtml.html("页面不存在");
				};
				if(status=="timeout"){
					ajaxHtml.html("请求超时，请重新检查网络。");
				};
			});
			menuBtn.each(function(index,element){
				var url=$(this).attr("href");
				url=url.slice(0,url.length-5);
				if(url==arr[1]){
					menuBtn.removeClass("hover");
					$(this).addClass("hover");
				}
			});
		};

		pageLoad();
		window.onpopstate=function(){
			pageLoad();
		};

	};
})(jQuery)