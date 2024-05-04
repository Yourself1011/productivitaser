import { storage } from "wxt/storage";

interface website {
    name: string;
    url: string;
    description: string;
}
  
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
