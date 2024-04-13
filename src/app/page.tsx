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
      <div
        className="absolute bottom-0 mb-5 mouse-icon"
        style={{
          transform: HeaderInView ? "none" : "translateY(00px)",
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
          style={{
            opacity: HeaderInView ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          particlesLoaded={
            particlesLoaded as (container?: Container) => Promise<void>
          }
        />
      )}
      <div className="container">
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
      </div>
    </div>
  );
}
