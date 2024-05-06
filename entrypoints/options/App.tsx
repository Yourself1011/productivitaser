import { useState, useEffect, ChangeEvent } from "react";
import { storage } from "wxt/storage";
import { useImmer } from "use-immer";
import Fuse from "fuse.js";
import { LuPencil } from "react-icons/lu";
import { FaTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { website } from "../types";
import { AiOutlineNodeIndex } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { SiD, SiDevpost } from "react-icons/si";

export default function () {
  const [websites, setWebsites] = useImmer<website[]>([]);
  const [searchString, setSearchString] = useState("");
  const [status, setStatus] = useState(
    <span className="text-slate-700">• No Changes</span>,
  );
  const [serial, setSerial] = useState<boolean>(false);

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
    setStatus(<span className="text-yellow-700">• Saving...</span>);
    await storage.setItem("local:websites", websites);
    setStatus(<span className="text-green-700">• All Changes Saved</span>);
  }

  useEffect(() => {
    (async () => {
      const fetchedWebsites = (await storage.getItem(
        "local:websites",
      )) as website[];
      if (fetchedWebsites) setWebsites(fetchedWebsites);
      else setWebsites([]);
    })();
  }, []);

  return (
    <div className="p-16">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl mb-4">Blocked Websites</h1>
        <div className="relative">
          <span className="text-base">{status}</span>
          <input
            placeholder="Search..."
            className="py-2 px-2 ml-4 bg-gray-100 border border-gray-200 rounded outline-none hover:bg-gray-200 hover:border-gray-300 focus:border-gray-400 text-base"
            value={searchString}
            onFocus={() => enable(false)}
            onBlur={() => enable(true)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchString(e.target.value);
            }}
          ></input>
          <div className="absolute right-2 top-3">
            <IoMdSearch size={20} />
          </div>
        </div>
      </div>

      <form onSubmit={save}>
        <div className="grid grid-cols-3 gap-8" ref={websitesAnimationElement}>
          {search(websites).map((website: website, index: number) => (
            <div className="shadow-lg border border-slate-100 bg-white p-4 rounded-2xl">
              <div className="flex items-center justify-between gap-2">
                <input
                  className="text-xl font-bold w-full outline-none bg-transparent"
                  value={website.name}
                  key={`input-${index.toString()}`}
                  onChange={(e) => {
                    setWebsites((draftWebsites) => {
                      draftWebsites[index] = {
                        ...draftWebsites[index],
                        name: e.target.value,
                      };
                    });
                    setStatus(
                      <span className="text-yellow-500">
                        • Unsaved Changes
                      </span>,
                    );
                  }}
                />
                {website.url.length > 0 && (
                  <img
                    src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${website.url}`}
                    onError={(e) => e.preventDefault()}
                    className="w-4 h-4"
                  />
                )}
              </div>
              <input
                className="w-full mb-4 outline-none bg-transparent"
                value={website.description}
                onChange={(e) => {
                  setWebsites((draftWebsites) => {
                    draftWebsites[index] = {
                      ...draftWebsites[index],
                      description: e.target.value,
                    };
                  });
                  setStatus(
                    <span className="text-yellow-500">• Unsaved Changes</span>,
                  );
                }}
              />
              <input
                className="w-full border border-slate-100 p-1 rounded-md outline-none bg-transparent"
                value={website.url}
                id={`url-${index.toString()}`}
                placeholder="Keyword, URL or regex"
                onChange={(e) => {
                  setWebsites((draftWebsites) => {
                    draftWebsites[index] = {
                      ...draftWebsites[index],
                      url: e.target.value,
                    };
                  });
                  setStatus(
                    <span className="text-yellow-500">• Unsaved Changes</span>,
                  );
                }}
                required
              />
              <p>Visited {website.visits} times</p>
              <div className="flex items-center gap-2 mt-4">
                <button
                  className="w-1/2 flex items-center justify-center gap-2"
                  onClick={() => {
                    document.getElementById(`url-${index.toString()}`)?.focus();
                  }}
                >
                  <LuPencil /> Edit
                </button>
                <button
                  className="w-1/2 contrast flex items-center justify-center gap-2"
                  onClick={() => {
                    enable(false);
                    setStatus(
                      <span className="text-yellow-500">
                        • Unsaved Changes
                      </span>,
                    );
                    setWebsites((draftWebsites) => {
                      draftWebsites.splice(index, 1);
                    });
                  }}
                >
                  <FaTrashCan /> Delete
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="shadow-lg h-[193px] border border-slate-100 bg-white p-4 rounded-2xl text-black text-xl hover:bg-neutral-50 transition-colors"
            onClick={() => {
              enable(true);
              setWebsites([
                ...websites,
                {
                  name: "New website",
                  url: "",
                  description: "Description",
                  visits: 0,
                },
              ]);
              setStatus(
                <span className="text-yellow-500">• Unsaved Changes</span>,
              );
            }}
          >
            + Add
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <button
            type="submit"
            className="contrast flex items-center justify-center gap-2"
          >
            <FaCheck /> Save
          </button>
        </div>
      </form>

      <div>
        <h1 className="mt-8 text-2xl">Serial</h1>
        <p className="text-base">
          {serial ? (
            <>Connected!</>
          ) : (<>No serial connected, yet.</>)}
          <button
            className="flex items-center justify-center gap-2 mt-4"
            onClick={async () => {
              const port = await navigator.serial.requestPort();

              await port.open({ baudRate: 9600 });
              console.log(JSON.stringify(port, function(key, value) { return value === undefined ? "undefined" : value }))
              setSerial(true);
              
              const writer = port.writable?.getWriter();
              
              await writer?.write(new Uint8Array([1]));
              writer?.releaseLock();
            }}
          >
            <AiOutlineNodeIndex /> Connect
          </button>
        </p>
      </div>

      <div className='absolute bottom-0 border-t border-t-neutral-200 bg-white left-0 w-full flex justify-between p-6 text-base'>
        <p className='flex gap-2 items-center'>Copyright &#169; 2024</p>
        <div className='flex items-center gap-8'>
            <a className='flex gap-2 items-center underline' href='https://github.com/Yourself1011/productivity-taser' target='_blank'><FaGithub /> GitHub</a>
            <a className='flex gap-2 items-center underline' href='https://devpost.com/software/lostazer' target='_blank'><SiDevpost /> Devpost</a>
        </div>
      </div>
    </div>
  );
}
