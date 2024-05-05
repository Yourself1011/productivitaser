import "./stop.css";
import { useEffect, useState } from "react";
import { website } from "../types";
import { storage } from "wxt/storage";

const movables = [
    "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7fbcc007-a943-4bd9-882a-62c0e55a2c7c_498x253.gif",
    "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c675268-7f6a-463e-b3ff-cef2f1eccaec_498x373.gif",
    "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9059cd24-de66-4088-96ab-66fd4fae33db_640x360.gif",
    "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe9e33e9e-8fa0-4f17-a409-9f0e1ddff1f1_498x373.gif",
    "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27d639f2-52c3-4e79-84da-309af13fa787_498x498.gif",
    "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9743136e-1844-4dfd-a7d2-265120a61754_498x373.gif",
] as string[];

export default function () {
    const [recent, setRecent] = useState<any>();

    useEffect(() => {
        (async () => {
            const a = await storage.getItem("local:recent");
            setRecent(a);
            console.log(a);

            const port = (await navigator.serial.getPorts())[0];
            console.log(await navigator.serial.getPorts());

            if (port) {
                port.open({ baudRate: 9600 });
                console.log("opened");
                const writer = port.writable?.getWriter();

                await writer?.write(new Uint8Array([15]));
                writer?.releaseLock();
                console.log("written");
                port.close();
            }
            console.log("found");
        })();
    }, []);

    return (
        <div className="flex items-center justify-center flex-col w-screen h-screen gap-8 text-lg stop">
            <img src={movables[Math.floor(Math.random() * movables.length)]}></img>
            <p className="text-3xl">❌</p>
            <h1 className="text-2xl">Stop right there, bub.</h1>
            <p>This isn't you.</p>
            {recent && recent > 1 && (
                <p>
                    You've already been here {recent} times. {recent >= 5 && <>Stop already!!</>}
                </p>
            )}
            <p>Hop off, because it isn't too late.</p>
            <button
                onClick={() => {
                    close();
                }}
            >
                I'm hopping off
            </button>
        </div>
    );
}
