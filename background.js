var tabs = [];
var sourceTabs = [];
var isWorking = false;
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action === "start") {
        isWorking = true;
        pullData();
        chrome.tabs.query({active: true}, function(tab) {
            var id = tab[0] && tab[0].id;
            chrome.tabs.sendMessage(id, {action: 'extend'});
        });
    }

    if (request.action === "stop") {
        isWorking = false;
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, info) {
	var index = tabs.indexOf(tabId);

	if (info.status === "complete" && index !== -1) {
		chrome.tabs.sendMessage(tabId, {action: 'report_back'}, function(count) {
			chrome.tabs.sendMessage(sourceTabs[index], {action: "push", data: count});
			chrome.tabs.remove(tabId);
			tabs.splice(index, 1);
			sourceTabs.splice(index, 1);
		});
	}
});

function pullData() {
    if (isWorking) {
        chrome.tabs.query({active: true}, function(tab) {
            var id = tab[0] && tab[0].id;
            chrome.tabs.create({url: "https://item.taobao.com/item.htm?id=536796147739", active: false}, function(tab){
                tabs.push(tab.id);
                sourceTabs.push(id);
            });
        });

        setTimeout(pullData, 20000);
    }
}