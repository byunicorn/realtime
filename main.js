if (window.location.href.startsWith("file:")) {
	
	setTimeout(pullData, 0);

	function pullData () {
		chrome.runtime.sendMessage({
			action: "pull",
			url: "https://item.taobao.com/item.htm?id=536796147739"
		});

		setTimeout(pullData, 30000);
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	if (request.action === "report_back") {
		if (window.location.href.startsWith("https://item.taobao")) {
			callback(document.getElementById("J_SpanStock").innerHTML);
		}
	}

	if(request.action === "push") {
		if (window.location.href.startsWith("file://")) {
			$("body").append("<div style='position:absolute; top: 0; left: 0;color:white'>" + request.data + "</div>");
		}
	}
});