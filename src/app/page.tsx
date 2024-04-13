"use client";
import { Container } from "@tsparticles/engine";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "framer-motion";

export default function Home() {
  const [init, setInit] = useState(false);
  const headerRef = useRef(null);
  const HeaderInView = useInView(headerRef, {
    once: true,
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container?: Container) => {
    console.log(container);
  };

  return (
    <div className="flex items-center justify-center">
      <Image
        className="top-0 left-0 absolute object-cover w-screen h-screen"
        priority
        draggable={false}
        src="/images/banner.svg"
        width={1920}
        height={1080}
        alt={"Banner Image"}
      />
      <div
        className="absolute bottom-0 mb-5 mouse-icon"
        style={{
          transform: HeaderInView ? "none" : "translateY(25px)",
          opacity: HeaderInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <div className="scroll" />
      </div>
      {init && (
        <Particles
          id="tsparticles"
          url="/config/particles.json"
          className="w-screen h-screen left-0 absolute top-0"
          style={{
            opacity: HeaderInView ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          particlesLoaded={
            particlesLoaded as (container?: Container) => Promise<void>
          }
        />
      )}
      <div className="container flex flex-col">
        {/* Header */}
        <div className="h-screen relative flex 2xl:flex-row flex-col-reverse 2xl:text-left text-center 2xl:justify-between justify-center items-center">
          <div
            style={{
              transform: HeaderInView ? "none" : "translateX(-200px)",
              opacity: HeaderInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
            ref={headerRef}
            className="flex flex-col 2xl:gap-5 gap-0"
          >
            <p
              className="white 2xl:text-9xl text-4xl"
              style={{
                textShadow:
                  "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
              }}
            >
              I'm <b>Kooper</b>
            </p>
            <TypeAnimation
              className="2xl:text-6xl text-2xl"
              sequence={[
                "Web Developer",
                1000,
                "App Developer",
                1000,
                "Game Developer",
                1000,
                "Software Engineer",
                1000,
              ]}
              wrapper="span"
              speed={75}
              style={{
                display: "inline-block",
                textShadow:
                  "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
              }}
              repeat={Infinity}
            />
          </div>
          <Image
            className="w-1/3"
            style={{
              transform: HeaderInView ? "none" : "translateX(200px)",
              opacity: HeaderInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              filter: "drop-shadow(0px 2px 5px #222)",
            }}
            src="/images/kooper.png"
            alt="Picture of Kooper"
            draggable={false}
            width={1080}
            height={1080}
          />
        </div>
        {/* About */}
        <div className="flex 2xl:flex-row flex-col-reverse 2xl:text-left text-center items-center justify-center py-8 gap-10 2xl:px-0 px-6">
          <Image
            className="rounded-full lg:w-1/3 w-1/2"
            src="/images/about.png"
            alt="Picture of Kooper"
            draggable={false}
            width={407}
            height={612}
          />
          <div className="flex flex-col gap-5">
            <p className="text-black text-4xl font-bold">Who am I?</p>
            <div className="flex flex-col gap-3">
              <p className="text-black text-2xl">
                Hello! I'm Kooper, a developer based in{" "}
                <span className="text-main font-bold">Madison, WI</span> who's
                experienced in taking fullstack applications from scratch to
                production.
              </p>
              <p className="text-black text-2xl">
                I'm currently an incoming computer science student at{" "}
                <span className="text-main font-bold">UW Madison</span>.
              </p>
              <p className="text-black text-2xl">
                I'm passionate about creating projects and{" "}
                <span className="text-main font-bold">
                  learning new technologies
                </span>
                . I'm always looking for new opportunities to{" "}
                <span className="text-main font-bold">collaborate</span> and{" "}
                create something amazing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
