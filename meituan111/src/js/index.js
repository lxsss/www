$(function(){
	showTime();
	var $guess = $(".guess-like");
	var index = 0;
	
	$(window).on("scroll",function(){
		var scrollTop = $(window).scrollTop();
		
		var docHeight = $(document).height();
		
		var winHeight = $(window).height();
		
		if(scrollTop >= docHeight - winHeight){
			index++;
			$("#loading").show();
			ajax();
		}
		if(scrollTop >= 800){
			$(".go-top").show();
		}
		if(scrollTop < 800){
			$(".go-top").hide()
		}
	});
	
	$(".go-top").click(function(){
		$(window).scrollTop(0);
		$(this).hide();
	})
	
	function ajax(callback){
		var i = (index == 1)? index : index*10;
		console.log(i);
		if(i >= 30){
			$("#loading").hide();
			return;
		}
		$.ajax({
			url:'http://diviner.jd.com/diviner?p=610009&uuid=12396477&lid='+i+'&lim=15&cb=tempGuessLikeCallback',

			scriptCharset:"gb2312",
			dataType:'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'tempGuessLikeCallback',
			success:function(res){
				var data = res.data;
				
				var _html = "";
				$.each(data,function(idx,obj){
					_html += "<dd class=list-"+(idx+1)+"><a><div class='dealcard'><span class='dealcard-nobooking'>免预约</span><div class='imgbox'><img src='http://img13.360buyimg.com/n1/s200x200_"+obj.img+"'/></div><div class='like-right'><div class='r-brand'>" + obj.t + "</div><div class='r-title'>"+obj.sku+"</div><div class='r-price'><span class='p-strong'>"+obj.jp+"</span><span class='p-strong-color'>元</span><del>门市价"+obj.c3+"</del><span class='p-num'>已售"+obj.spu+"</span></div></div></div></a></dd>"
				});
				
				$guess.children("dl").append(_html);
				
				// 回调函数，等数据全部拼接完再执行
//				if (typeof callback == 'function') {
//					callback();
//				}
			}
		});
		
	}
		
//		function showImg(){
//			$(".list-"+index+" img").each(function(){
//				$(this).animate({opacity:0.3},500,function(){
//					$(this).attr("src",$(this).attr("data-lazy-img")).animate({opacity:1},1000);
//				});
//			});
//		}
		
		
	
	
});

//=============倒计时函数======================
	function showTime(){
		var time_start = new Date().getTime();  //获取当前时间
		var time_end = new Date("2016-11-12 00:00:00").getTime();  //设置停止时间
		var time_distance = time_end - time_start;   //计算时间差
		// 天   时间差（毫秒数）÷3600÷24即为天数，时分秒类似
	    var int_day = Math.floor(time_distance/86400000);
	    time_distance -= int_day * 86400000;   //得到除去天数外剩下的时分秒  以此类推
	    // 时
	    var int_hour = Math.floor(time_distance/3600000);
	    time_distance -= int_hour * 3600000;   
	    // 分
	    var int_minute = Math.floor(time_distance/60000);
	    time_distance -= int_minute * 60000; 
	    // 秒 
	    var int_second = Math.floor(time_distance/1000);
	    // 时分秒为单数时、前面加零 
	    if(int_day < 10){ 
	        int_day = "0" + int_day; 
	    } 
	    if(int_hour < 10){ 
	        int_hour = "0" + int_hour; 
	    } 
	    if(int_minute < 10){ 
	        int_minute = "0" + int_minute; 
	    } 
	    if(int_second < 10){
	        int_second = "0" + int_second; 
	    }  
	
		$(".time-hour").text(int_hour);
		$(".time-min").text(int_minute);
		$(".time-sec").text(int_second);
	    // 设置定时器
	    setTimeout(showTime,1000); 
	}
