import { useEffect, useState } from "react";
import { storage } from "wxt/storage";

export default function () {
    const [websiteList, setWebsiteList] = useState("");

    async function save() {
        await storage.setItem("local:websites", websiteList);
    }

    useEffect(() => {
        (async () => {
            setWebsiteList((await storage.getItem("local:websites")) as string);
        })();
    }, []);

    return (
        <div>
            <form onSubmit={save}>
                <textarea
                    onChange={(e) => {
                        setWebsiteList(e.target.value);
                    }}
                    placeholder="Enter a website"
                />
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
                    } catch (e: Exception) {
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
