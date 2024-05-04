import { useEffect } from "react";
import "./Popup.css";

export default function () {
    useEffect(() => {
        console.log("Hello from the popup!");
    }, []);

    return (
        <div>
            <img src="/icon-with-shadow.svg" />
            <h1>vite-plugin-web-extension</h1>
            <p>
                Template: <code>react-ts</code>
            </p>

            <button
                onClick={async () => {
                    console.log("among us");
                    const device = await navigator.bluetooth.requestDevice();
                }}
            >
                Connect
            </button>
        </div>
    );
}
