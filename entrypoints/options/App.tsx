import { SetStateAction, useEffect, useState } from "react";
import { storage } from "wxt/storage";

export default function () {
  const [websiteList, setWebsiteList] = useState<string[]>([]);

  const [newWebsite, setNewWebsite] = useState("");

  async function save() {
    setWebsiteList([...websiteList, newWebsite]);
    se
        
    await storage.setItem("local:websites", websiteList);
  }

  useEffect(() => {
    (async () => {
      //setWebsiteList((await storage.getItem("local:websites")) as SetStateAction<string[]>);
    })();
  }, []);

  return (
    <div>
      <p>Websites:</p>
      <form onSubmit={save}>
        {websiteList.map(website => <span>{website}</span>)}

        {//<label htmlFor="addWebsite"></label>}
        <input name="addWebsite" placeholder="Add website" value={newWebsite} onChange={e => setNewWebsite(e.target.value)} >

        </input>
        <button type="submit" onClick={save}>
          submit
        </button>
      </form>
      <button
        onClick={async () => {
          // console.log("among us");
          try {
            const device = await navigator.bluetooth.requestDevice({
              filters: [{ name: "HC-05" }],
              // acceptAllDevices: true,
            });

            const server = await device.gatt?.connect();
            console.log(device, server);
          } catch (e: any) {
            console.log(e.message);
          }

          // const port = await navigator.serial.requestPort();
          // console.log(port.getInfo());

          // await port.open({ baudRate: 9600 });
          // const writer = port.writable?.getWriter();

          // await writer?.write(new Uint8Array([1]));
          // writer?.releaseLock();
        }}
      >
        Connect
      </button>
    </div>
  );
}
