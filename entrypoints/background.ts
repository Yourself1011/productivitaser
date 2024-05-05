import { storage } from "wxt/storage";
import { browser } from "wxt/browser";

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
                for (let site in fetchedWebsites) {
                    if (tab.url?.includes(fetchedWebsites[site].url)) {
                        browser.tabs.update(tabId, { url: '/stop.html' });
                        console.log('found')
                    }
                }
              };
        
            console.log(tab.url)
        }
    });
});
