import { storage } from "wxt/storage";
import { browser } from "wxt/browser";
import { website } from "./types";

const fetchedWebsites = [
  {
    name: "YouTube",
    url: "youtube.com",
    visits: 0,
  },
  {
    name: "Instagram",
    url: "instagram.com",
    visits: 0,
  },
  {
    name: "LinkedIn",
    url: "linkedin.com",
    visits: 0,
  },
  {
    name: "Twitter",
    url: "https://x.com/",
    visits: 0,
  },
  {
    name: "extensions",
    url: "//extensions",
    visits: 0,
  }
] as website[];

export default defineBackground(() => {
  browser.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      // const fetchedWebsites = (await storage.getItem(
      //   "local:websites",
      // )) as website[];

      if (fetchedWebsites) {
        for (let site in fetchedWebsites) {
          if (
            (fetchedWebsites[site].url !== "" &&
              tab.url?.includes(fetchedWebsites[site].url)) ||
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
    }
  });
});
