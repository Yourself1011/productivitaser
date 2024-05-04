export default defineBackground(() => {
    console.log("Hello from the background! fortnite");

    browser.runtime.onInstalled.addListener((details) => {
        console.log("Extension installed:", details);
    });

    browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == "complete") {
            // do your things
        }
    });
});
