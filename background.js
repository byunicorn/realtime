chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	if (request.action === "pull") {
		chrome.tabs.create({url: request.url, active: false}, function(bula){
			newTab = bula.id;
		});
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, info) {
	if (info.status === "complete") {
		chrome.tabs.sendMessage(tabId, {action: 'report_back'}, function(count) {
			chrome.tabs.query({active: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {action: "push", data: count});
			});
		});
	}
});