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
                        tab.url?.toString() !== "" &&
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

                        const port = await storage.getItem<SerialPort>("local:port");
                        console.log({ port });

                        if (port) {
                            await port.open({ baudRate: 9600 });

                            console.log("opened");
                            const writer = port.writable?.getWriter();

                            await writer?.write(new Uint8Array([1]));
                            writer?.releaseLock();
                            console.log("written");
                            port.close();
                        }
                        console.log("found");
                    }
                }
            }

            console.log(tab.url);
        }
    });
});
