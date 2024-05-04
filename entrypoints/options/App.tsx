import { useEffect } from "react";
import { storage } from "wxt/storage";
import { useImmer } from "use-immer";

interface website {
  name: string;
  url: string;
  description: string;
}

export default function () {
  const [websites, setWebsites] = useImmer<website[]>([]);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
    <div className="p-16">
      <h1 className="text-3xl mb-4">Websites:</h1>
      <form onSubmit={save}>
        { websites.length == 0 && <p >No websites blocked.</p>}
        {websites.map((website: website, index: number) => (
          <div className="shadow-[0_5px_10px_-1px_rgba(0,0,0,0.2)] p-4 rounded-2xl">
            <input
              className="text-xl font-bold w-full outline-none bg-transparent"
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
              className="w-full outline-none bg-transparent"
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
              className="w-full outline-none bg-transparent"
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
          className="mt-4"
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
