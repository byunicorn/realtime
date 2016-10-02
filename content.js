chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action === "extend") {
        $("video").css("width", "100%");
    }

    if (request.action === "report_back") {
        if (window.location.href.startsWith("https://item.taobao")) {
        	var links = $("#J_isku .J_TSaleProp li");
        	var target = $("#J_SpanStock");
        	var props = {};
        	links.eq(0).click();
        	props.white = 100000 - parseInt(target.html());
        	links.eq(1).click();
        	props.red = 100000 - parseInt(target.html());
            callback(props);
        }
    }

    if(request.action === "push") {
        if (request.data && !$.isEmptyObject(request.data)) {
            if ($("#data-container").length === 0) {
                var container = $("<div id='data-container'>红白对决票数: <span class='red'></span>vs<span class='white'></span></div>");
                $("body").append(container);
            }

            var target = $("#data-container");
            console.log(JSON.stringify(request.data));
            target.find(".red").html(request.data.red);
            target.find(".white").html(request.data.white);
            
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            target.show().removeClass('animated slideInDown')
            .addClass('animated slideInDown').one(animationEnd, function() {
            	target.removeClass('animated slideInDown');
	            setTimeout(function() {
					target.removeClass('animated slideOutUp').addClass('animated slideOutUp').one(animationEnd, function() {
						target.removeClass('animated slideOutUp');
						target.hide();
					});
	            }, 5000);
	        });
        }
    }
});
