import { useState, useEffect, ChangeEvent } from "react";
import { storage } from "wxt/storage";
import { useImmer } from "use-immer";
import Fuse from "fuse.js";
import { LuPencil } from "react-icons/lu";
import { FaTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface website {
  name: string;
  url: string;
  description: string;
}

export default function () {
  const [websites, setWebsites] = useImmer<website[]>([]);
  const [searchString, setSearchString] = useState("");
  const [status, setStatus] = useState(<span className='text-slate-700'>• No Changes</span>);

  const [websitesAnimationElement, enable] = useAutoAnimate();

  function search(sites: website[]) {
    const options = {
      includeScore: false,
      includeMatches: true,
      threshold: 0.2,
      keys: ["name"],
    };
    const fuse = new Fuse(sites, options);
    if (searchString.length === 0) return websites;

    const results = fuse.search(searchString);
    return results.map((results) => results.item);
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(<span className='text-yellow-700'>• Saving...</span>)
    await storage.setItem("local:websites", websites);
    setStatus(<span className='text-green-700'>• All Changes Saved</span>)
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl mb-4">Blocked Websites</h1>
        <div>
          <span className='text-base'>{status}</span>
          <input
            placeholder="Search..."
            className="py-2 px-2 ml-2 bg-gray-100 border border-gray-200 rounded outline-none hover:bg-gray-200 hover:border-gray-300 focus:border-gray-400 text-base"
            value={searchString}
            onFocus={() => enable(false)}
            onBlur={() => {
              enable(true)
            }}
            
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchString(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <form onSubmit={save}>
        {(websites.length == 0 || !websites) && <p>No websites blocked.</p>}
        <div className="grid grid-cols-3 gap-8" ref={websitesAnimationElement}>
          {search(websites).map((website: website, index: number) => (
            // shadow-[0_5px_10px_-1px_rgba(0,0,0,0.2)]
            <div className="shadow-lg border border-slate-100 bg-white p-4 rounded-2xl">
              <input
                className="text-xl font-bold w-full outline-none bg-transparent"
                value={website.name}
                onChange={(e) => {
                  setWebsites((draftWebsites) => {
                    draftWebsites[index] = {
                      ...draftWebsites[index],
                      name: e.target.value,
                    };
                  })
                  setStatus(<span className='text-yellow-500'>• Unsaved Changes</span>)
                  }
                }
              />
              <input
                className="w-full mb-4 outline-none bg-transparent"
                value={website.description}
                onChange={(e) =>{
                  setWebsites((draftWebsites) => {
                    draftWebsites[index] = {
                      ...draftWebsites[index],
                      description: e.target.value,
                    };
                  })
                  setStatus(<span className='text-yellow-500'>• Unsaved Changes</span>)
                  }
                }
              />
              <input
                className="w-full underline border border-slate-300 p-1 rounded-md outline-none bg-transparent"
                value={website.url}
                id={`url-${index.toString()}`}
                onChange={(e) =>{
                  setWebsites((draftWebsites) => {
                    draftWebsites[index] = {
                      ...draftWebsites[index],
                      url: e.target.value,
                    };
                  })
                  setStatus(<span className='text-yellow-500'>• Unsaved Changes</span>)
                }
                }
              />
              <div className="flex items-center gap-2 mt-4">
                <button 
                  className="w-1/2 flex items-center justify-center gap-2"
                  onClick={
                    () => {
                      document.getElementById(`url-${index.toString()}`)?.focus();
                    }
                  }
                ><LuPencil /> Edit</button>
                <button className="w-1/2 border border-slate-800 bg-white text-slate-800 flex items-center justify-center gap-2" onClick={
                  () => {
                    console.log('jonald')
                    setStatus(<span className='text-yellow-500'>• Unsaved Changes</span>)
                    console.log('jonald')
                    setWebsites((draftWebsites) => {
                      draftWebsites.splice(index, 1);
                    });
                  }
                }>
                  <FaTrashCan /> Delete
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className='shadow-lg border border-slate-100 bg-white p-4 rounded-2xl text-black text-xl hover:bg-neutral-50 transition-colors '
            onClick={() => {
              setWebsites([
                ...websites,
                {
                  name: "New website",
                  url: "https://example.com",
                  description: "Description",
                },
              ]);
              setStatus(<span className='text-yellow-500'>• Unsaved Changes</span>)
            }}
          >
            + Add
          </button>
        </div>
        <button
          type="submit"
          className="mt-4 ml-2 border border-slate-800 bg-white text-slate-800 flex items-center justify-center gap-2"
        >
          <FaCheck /> Save
        </button>
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
