"use client";

import { useEffect } from "react";
// import Image from "next/image";
// import dynamic from "next/dynamic";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { SplitText } from "gsap/SplitText";
import { useAppContext, useAppDispatch } from "@/context/AppContext";
// import Loading from "@/components/Loading";
// import logo from "@/assets/Logo-Space.png";
import MainCanvas from "@/components/webgl/MainCanvas";
import ComingSoon from "@/components/ui/ComingSoon";

type WebGLStageProps = {
  children: React.ReactNode;
};

export default function WebGLStage({children}: WebGLStageProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "init" });
  }, [dispatch]);

  return (
    <>
      {/* {enterExperience ? children : <Loading />} */}
      <ComingSoon />
      <div className="w-full h-full fixed z-0 top-0 bg-gradient-to-t from-nse-pink-900 from-[1%] via-[#001949] to-nse-black bg-fixed">
        {/* <div className="w-full h-full fixed top-0 flex items-center justify-center p-8 opacity-50">
            <Image
              src={logo}
              alt="A S Monogram logo"
              className="max-w-[200px] md:max-w-xs w-full h-auto"
            />
          </div> */}
        <div className="relative z-50 w-full h-full">
          <MainCanvas />
        </div>
      </div>
    </>
  )
}
