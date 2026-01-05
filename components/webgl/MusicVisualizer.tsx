"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useAppContext, useAppDispatch } from "@/context/AppContext";

export default function MusicVisualizer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { camera } = useThree();
  const { audioLoader, audio, listener } = useAppContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(audioLoader);
    audioLoader.load("./Elektra-Moon-Light.mp3", (buffer) => {
      audio.setBuffer(buffer);
      audio.loop = true;
    });
    camera.add(listener);

    // window.addEventListener(
    //   "mousedown",
    //   () => {
    //     if (!audio.isPlaying) {
    //       audio.play();
    //     }
    //   },
    //   { once: true }
    // );
    dispatch({ type: "musicReady" });
  }, [audio, audioLoader, camera, listener, dispatch]);

  return <>{children}</>;
}
