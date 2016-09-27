var target = $("input[type=checkbox]");
var isWorking = JSON.parse(window.localStorage.getItem("kh_pull_data"));
if (typeof isWorking !== "undefined") {
    target.prop("checked", !isWorking);
}

target.on("change", function() {
	isWorking = !target.prop("checked");
    window.localStorage.setItem("kh_pull_data", isWorking);
	if (isWorking) {
        sendAction("start");
	} else {
        sendAction("stop");
	}
});

function sendAction(action) {
    chrome.runtime.sendMessage({action: action});
}