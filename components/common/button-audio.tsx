"use client";

import { Play } from "lucide-react";
import useSound from "use-sound";

export default function ButtonAudio({ src }: { src: string }) {

    const [play] = useSound(src, { volume: 0.05 });

    const handleAudio = () => {
        play();
    }

    return (
        <button onClick={handleAudio} className="text-blue-500 text-xl cursor-pointer border-2 rounded-full p-2 hover:bg-blue-500 hover:text-white">
            <Play />
            <audio id="audio_cry">
                <source src={src} type="audio/ogg" />
                Your browser does not support the audio element.
            </audio>
        </button>
    );

}