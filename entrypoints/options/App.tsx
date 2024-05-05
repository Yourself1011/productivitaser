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

export default function () {
    const [websites, setWebsites] = useImmer<website[]>([]);
    const [searchString, setSearchString] = useState("");
    const [status, setStatus] = useState(<span className="text-slate-700">• No Changes</span>);

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
            const fetchedWebsites = (await storage.getItem("local:websites")) as website[];
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
                        className="py-2 px-2 ml-2 bg-gray-100 border border-gray-200 rounded outline-none hover:bg-gray-200 hover:border-gray-300 focus:border-gray-400 text-base"
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
                            {website.url.length > 0 && <img src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${website.url}`} onError={e => e.preventDefault()} className="w-4 h-4" />}
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
                                        <span className="text-yellow-500">• Unsaved Changes</span>
                                    );
                                }}
                            />
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
                                        <span className="text-yellow-500">• Unsaved Changes</span>
                                    );
                                }}
                            />
                            <p>Visited {website.visits} times</p>
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
                                        <span className="text-yellow-500">• Unsaved Changes</span>
                                    );
                                }}
                                required
                            />
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
                                        console.log("jonald");
                                        setStatus(
                                            <span className="text-yellow-500">
                                                • Unsaved Changes
                                            </span>
                                        );
                                        console.log("jonald");
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
                            setWebsites([
                                ...websites,
                                {
                                    name: "New website",
                                    url: "",
                                    description: "Description",
                                    visits: 0,
                                },
                            ]);
                            setStatus(<span className="text-yellow-500">• Unsaved Changes</span>);
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
                    <button
                        className="flex items-center justify-center gap-2"
                        onClick={async () => {
                            // console.log("among us");
                            // try {
                            //     const device = await navigator.bluetooth.requestDevice({
                            //         filters: [{ name: "HC-05" }],
                            //         // acceptAllDevices: true,
                            //     });

                            //     const server = await device.gatt?.connect();
                            //     console.log(device, server);
                            // } catch (e: any) {
                            //     console.log(e.message);
                            // }

                            const port = await navigator.serial.requestPort();
                            // console.log(await navigator.serial.getPorts());

                            await port.open({ baudRate: 9600 });
                            console.log(port);

                            // let carbage = await storage.getItem("local:port");
                            // console.log({ carbage, port });
                            // await storage.setItem<SerialPort>("local:port", port);
                            // carbage = await storage.getItem("local:port");
                            // console.log({ carbage, port });

                            // console.log("opened");
                            const writer = port.writable?.getWriter();

                            await writer?.write(new Uint8Array([1]));
                            writer?.releaseLock();
                            console.log("written");
                        }}
                    >
                        <AiOutlineNodeIndex /> Connect
                    </button>
                </div>
            </form>
        </div>
    );
}
