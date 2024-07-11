import { storage } from "wxt/storage";
import { browser } from "wxt/browser";
import { website } from "./types";

export default defineBackground(() => {
  browser.windows.onCreated.addListener(async function () {
    console.log("obese");
    if (await storage.getItem("local:standUpEnabled")) {
      const interval = (await storage.getItem("local:standUpInterval")) / 60000;
      setInterval(
        async () =>
          await browser.windows.create({
            url: "/standup.html",
            type: "popup",
            width: 400,
            height: 400,
          }),
        interval,
      );
    }
  });

  browser.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      const fetchedWebsites = (await storage.getItem(
        "local:websites",
      )) as website[];
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
