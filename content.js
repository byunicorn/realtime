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
                var container = $("<div id='data-container' style='transform: scale(10);transform-origin: top left;color:black; position:absolute; top:0; left:0; background:white; z-index:99999;'></div>");
                $("body").append(container);
            }

            $("#data-container").html(request.data).animate({
                opacity: 0.4,
                fontSize: "3em"
            }, 1500).animate({
                opacity: 1,
                fontSize: "1em"
            }, 1500);
        }
    }
});
