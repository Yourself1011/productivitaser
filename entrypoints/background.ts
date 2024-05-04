import { storage } from "wxt/storage";

interface website {
    name: string;
    url: string;
    description: string;
}
  
export default defineBackground(() => {
    console.log("Hello from the background! fortnite");

    browser.runtime.onInstalled.addListener((details) => {
        console.log("Extension installed:", details);
    });

    browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        console.log("Tab updated", tabId, changeInfo, tab);
        // if (changeInfo.status == "complete") {
        //     // do your things
        //     storage.getItem<website[]>("local:websites").then((result) => {
        //         console.log(result);
        //     });
        // }
    });
});
