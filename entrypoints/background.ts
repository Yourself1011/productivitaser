import { storage } from "wxt/storage";
import { browser } from "wxt/browser";
import { website } from "./types";

export default defineBackground(() => {
    console.log("Hello from the background! fortnite");

    browser.runtime.onInstalled.addListener((details) => {
        console.log("Extension installed:", details);
    });

    browser.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
        if (changeInfo.status == "complete") {
            const fetchedWebsites = (await storage.getItem("local:websites")) as website[];
            if (fetchedWebsites) {
                for (let site in fetchedWebsites) {
                    if (
                        fetchedWebsites[site].url !== "" &&
                        tab.url?.includes(fetchedWebsites[site].url) ||
                        tab.url?.match(fetchedWebsites[site].url)
                    ) {
                        browser.tabs.update(tabId, { url: `/stop.html` });
                        fetchedWebsites[site] = {
                            ...fetchedWebsites[site],
                            visits: fetchedWebsites[site].visits + 1,
                        };
                        await storage.setItem("local:websites", fetchedWebsites);
                        await storage.setItem("local:recent", fetchedWebsites[site].visits);
                    }
                }
            }

            console.log(tab.url);
        }
    });
});
