$(function(){
//	alert(1111)
	function test(){
		//当前时间
		var data=new Date()
		var nowTime = new Date().getTime();
		

		var nowTime =data.getTime();
		// 结束时间
		
		var end=new Date("11/14/2016")
		// 相差的时间	
		var endTime=end.getTime()
		
		
		var t = endTime-nowTime;
		
		
		var d=Math.floor(t/1000/3600/24);
		var h=Math.floor(t/1000/3600);
		var i=Math.floor(t/1000/60%60);
		var s=Math.floor(t/1000%60);
		
		var att=[h,i,s];
		//遍历
		var avv=$('.content_right').find("b")
		$.each(avv, function(index,ele) {	
			
	    $(ele).html(att[index%3]);
		
			
		});  
		
	};
	setInterval(test,1000);
	
	
	
			
	$(function(){
			/*
				懒加载效果
					1）页面载入时请求部分数据
					2）当滚动条滚动到接近底部时，加载更多的数据
						给window绑定scroll事件
			 */
			// 获取页面元素
			var $datalist = $('.shuju');
			var $ul = $datalist.children('ul');
			var index = 0;
			
			
			ajax(showImg);
			// 2）当滚动条滚动到接近底部时，加载更多的数据
			$(window).on('scroll',function(){
				
				var scrollTop = $(window).scrollTop();
				
				// 文档内容高度
				var docHeight = $(document).height();

				// 窗口高度
				var winHeight = $(window).height();
				
				// 滚动条滚到底时触发
				if(scrollTop >= docHeight - winHeight){
					index++;
					if(index>=4){
						index=4;
						return;
					}
					
					
					
					
					$('#loading').show();
					ajax(showImg);
				};
	
			});
			
			function ajax (callback) {
				var i = (index == 1) ? index : index * 15;
				$.ajax({
						url:'http://diviner.jd.com/diviner?p=610009&uuid=12396477&lid='+i+'&lim=15&cb=tempGuessLikeCallback',
						dataType:'jsonp',
						jsonp: 'callback',
						scriptCharset:'gb2312', 
						jsonpCallback: 'tempGuessLikeCallback',
						success:function(res){
							
							var data = res.data;
							
							var _html = '';
							$.each(data,function(idx,obj){
								// 把json的图片路径先放在新增的data-lazy-img属性里面，等数据处理完了再替换src属性
								_html += '<li class="list-'+idx+'"><p><img src="img/load.jpg" data-lazy-img="http://img13.360buyimg.com/n1/s200x200_'+ obj.img +'"></p><i class="introduce">' + unescape(obj.t) + '</i><i class="rmb">￥'+obj.c3+'</i></p><p class="aa">已售：<i>'+obj.sku+'</i></p></li>';
							});
//							console.log(_html)
							$(' <ul/>').addClass('list-'+index).html(_html).appendTo($datalist);
							
							// 回调函数，等数据全部拼接完再执行
							if (typeof callback == 'function') {
								callback();
							};
						}
					});
			};
	
	      // 用data-lazy-img属性替换src属性
			function showImg () {
				$('.list-' + index + ' img').each(function (){
					$(this).animate({opacity:0.3}, 2000, function() {
						$(this).attr('src', $(this).attr('data-lazy-img')).animate({opacity: 1}, 1000);
					});
				});
			};
			
			
   	$(window).scroll(function(){
   		var top=$(Window).scrollTop()
   		if(top>=300){
   			$('.icon').show()
   		}else{
   			$('.icon').hide()
   		};
   		
   		
   	});
   	
   	$('.icon').click(function(){
   		$(window).scrollTop(0)
   	});
   		  
   
 	
   
			
	
});
});
