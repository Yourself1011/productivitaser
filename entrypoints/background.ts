import { storage } from "wxt/storage";

export default defineBackground(() => {
    browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == "complete") {
            
            // do your things
            storage.getItem<string>("local:websites").then((result) => {
                console.log(result);
            });
        }
    });
});
