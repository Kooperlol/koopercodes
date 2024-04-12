"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div className="w-screen flex items-center justify-center">
      <Image
        className="absolute object-cover min-h-screen w-screen max-h-screen"
        priority
        draggable={false}
        src="/images/banner.svg"
        width={1920}
        height={1080}
        alt={"Banner Image"}
      />
      <div className="container">
        <div className="h-screen relative flex 2xl:flex-row flex-col-reverse 2xl:text-left text-center 2xl:justify-between justify-center items-center">
          <div className="flex flex-col 2xl:gap-5 gap-0">
            <p className="white 2xl:text-9xl text-4xl outline-black outline-8">
              I'm <b>Kooper</b>
            </p>
            <TypeAnimation
              className="2xl:text-8xl text-3xl"
              sequence={[
                "I make websites",
                1000,
                "I make mobile apps",
                1000,
                "I make games",
                1000,
                "I make software",
                1000,
              ]}
              wrapper="span"
              speed={75}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
          <Image
            className="w-1/3 drop-shadow-2xl"
            src="/images/kooper.png"
            alt="Picture of Kooper"
            draggable={false}
            width={1080}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
}
