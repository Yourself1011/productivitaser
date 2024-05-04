import { SetStateAction, useEffect, useState } from "react";
import { storage } from "wxt/storage";
import { useImmer } from "use-immer";

interface website {
  name: string;
  url: string;
  description: string;
}

export default function () {
  const [websites, setWebsites] = useImmer<website[]>([]);

  //const [newWebsite, setNewWebsite] = useState<website>());

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //setWebsiteList([...websiteList, newWebsite]);
    //setNewWebsite('')

    await storage.setItem("local:websites", websites);
  }

  useEffect(() => {
    (async () => {
      const fetchedWebsites = (await storage.getItem(
        "local:websites"
      )) as website[];
      if (fetchedWebsites) setWebsites(fetchedWebsites);
      else setWebsites([]);
    })();
  }, []);

  return (
    <div>
      <p>Websites:</p>
      <form onSubmit={save}>
        {websites.map((website: website, index: number) => (
          <div className="shadow p-4">
            <input
              value={website.name}
              onChange={(e) =>
                setWebsites((draftWebsites) => {
                  draftWebsites[index] = {
                    ...draftWebsites[index],
                    name: e.target.value,
                  };
                })
              }
            />
            <input
              value={website.url}
              onChange={(e) =>
                setWebsites((draftWebsites) => {
                  draftWebsites[index] = {
                    ...draftWebsites[index],
                    url: e.target.value,
                  };
                })
              }
            />
            <input
              value={website.description}
              onChange={(e) =>
                setWebsites((draftWebsites) => {
                  draftWebsites[index] = {
                    ...draftWebsites[index],
                    description: e.target.value,
                  };
                })
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setWebsites([
              ...websites,
              {
                name: "New website",
                url: "https://example.com",
                description: "Desc",
              },
            ]);
          }}
        >
          Add
        </button>
        <button type='submit'>Save</button>
      </form>

      {/* //   <button
    //     onClick={async () => {
    //       // console.log("among us");
    //       try {
    //         const device = await navigator.bluetooth.requestDevice({
    //           filters: [{ name: "HC-05" }],
    //           // acceptAllDevices: true,
    //         });

    //         const server = await device.gatt?.connect();
    //         console.log(device, server);
    //       } catch (e: any) {
    //         console.log(e.message);
    //       }

    //       // const port = await navigator.serial.requestPort();
    //       // console.log(port.getInfo());

    //       // await port.open({ baudRate: 9600 });
    //       // const writer = port.writable?.getWriter();

    //       // await writer?.write(new Uint8Array([1]));
    //       // writer?.releaseLock();
    //     }}
    //   >
    //     Connect
    //   </button> */}
    </div>
  );
}
