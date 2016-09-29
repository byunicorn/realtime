chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action === "extend") {
        $("video").css("width", "100%");
    }

    if (request.action === "report_back") {
        if (window.location.href.startsWith("https://item.taobao")) {
            callback(document.getElementById("J_SpanStock").innerHTML);
        }
    }

    if(request.action === "push") {
        if (request.data && !isNaN(request.data)) {
            if ($("#data-container").length === 0) {
                var container = $("<div id='data-container'>红白对决票数: <span class='red'></span>vs<span class='white'></span></div>");
                $("body").append(container);
            }

            var target = $("#data-container");
            target.find(".red").html(request.data);
            target.find(".white").html(request.data);
            
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            target.show()
            .addClass('animated slideInDown').one(animationEnd, function() {
            	target.removeClass('animated slideInDown');
	            setTimeout(function() {
					target.addClass('animated slideOutUp').one(animationEnd, function() {
						target.removeClass('animated slideOutUp');
						target.hide();
					});
	            }, 5000);
	        });
        }
    }
});
