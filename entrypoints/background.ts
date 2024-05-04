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

    browser.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
        if (changeInfo.status == "complete") {
            console.log('joe')

            const fetchedWebsites = (await storage.getItem(
                "local:websites"
              )) as website[];
              if (fetchedWebsites) {
                console.log(fetchedWebsites);
              };
        
            console.log(tab.url)
        }
    });
});
