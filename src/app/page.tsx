"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import KooperParticles from "@/components/particles";
import portfolioJSON from "@/../public/config/portfolio.json";
import ProjectCard from "@/components/project-card";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/navigation";
import kooperimage from "@/../public/images/kooper.webp";
import aboutimage from "@/../public/images/about.webp";
import { Tooltip } from "@chakra-ui/react";

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeaderInView, setIsHeaderInView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isElementInView =
      headerRef.current?.getBoundingClientRect().top!! >= 0 &&
      headerRef.current?.getBoundingClientRect().bottom!! <= window.innerHeight;
    if (isElementInView) {
      setTimeout(() => {
        setIsHeaderInView(true);
      }, 150);
    }

    const handleScroll = () => {
      const isElementInView =
        headerRef.current?.getBoundingClientRect().top!! >= 0 &&
        headerRef.current?.getBoundingClientRect().bottom!! <=
          window.innerHeight;
      if (isElementInView) {
        setIsHeaderInView(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerRef]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        className="top-0 left-0 absolute object-cover w-screen h-screen"
        priority
        draggable={false}
        src="/images/banner.svg"
        width={1920}
        height={1080}
        alt={"Banner Image"}
      />
      <KooperParticles />
      <div className="container flex flex-col">
        {/* Header */}
        <div
          id="header"
          className="h-screen relative flex 2xl:flex-row flex-col-reverse 2xl:text-left text-center 2xl:justify-between justify-center items-center p-16"
        >
          <div
            className="mb-5 mouse-icon"
            style={{
              opacity: isHeaderInView ? 1 : 0,
              transform: isHeaderInView ? "none" : "translateY(25px)",
              transitionProperty: "transform, opacity",
              transitionDuration: "0.9s",
              transitionTimingFunction: "cubic-bezier(0.17, 0.55, 0.55, 1)",
            }}
          >
            <div className="scroll" />
          </div>
          <div
            style={{
              opacity: isHeaderInView ? 1 : 0,
              transform: isHeaderInView ? "none" : "translateX(-200px)",
              transitionProperty: "transform, opacity",
              transitionDuration: "0.9s",
              transitionTimingFunction: "cubic-bezier(0.17, 0.55, 0.55, 1)",
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
            priority
            className="lg:w-1/3 w-1/2"
            style={{
              opacity: isHeaderInView ? 1 : 0,
              transform: isHeaderInView ? "none" : "translateX(200px)",
              transitionProperty: "transform, opacity",
              transitionDuration: "0.9s",
              transitionTimingFunction: "cubic-bezier(0.17, 0.55, 0.55, 1)",
              filter: "drop-shadow(0px 2px 5px #222)",
            }}
            src={kooperimage}
            alt="Picture of Kooper"
            draggable={false}
            width={400}
            height={400}
          />
        </div>
        {/* About */}
        <div
          id="about"
          className="flex 2xl:flex-row flex-col-reverse 2xl:text-left text-center items-center justify-center py-8 gap-10 2xl:px-0 px-6"
        >
          <Image
            className="rounded-full lg:w-1/3 w-1/2"
            src={aboutimage}
            alt="Picture of Kooper"
            loading="lazy"
            draggable={false}
            placeholder="blur"
            width={407}
            height={612}
          />
          <div className="flex flex-col gap-5">
            <p className="text-black text-4xl font-bold">Who am I?</p>
            <div className="flex flex-col gap-3">
              <p className="text-black text-2xl">
                Hello! I'm Kooper, a developer based in{" "}
                <Tooltip label="Home to Janesville and Beloit, with a mix of urban areas, natural beauty like the Rock River, and over 250 miles of trails for outdoor enthusiasts.">
                  <span className="text-main font-bold">Rock County, WI</span>
                </Tooltip>{" "}
                who's experienced in taking fullstack applications from scratch
                to production.
              </p>
              <p className="text-black text-2xl">
                I'm currently an incoming computer science student at{" "}
                <Tooltip label="A private, accredited university with over 200 online & on-campus programs. Known for affordability and focus on career-oriented degrees.">
                  <span className="text-main font-bold">
                    Southern New Hampshire University
                  </span>
                </Tooltip>
                .
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
        {/* Technologies */}
        <div id="technologies" className="bg-full p-10 flex flex-col gap-3">
          <p className="text-center text-black text-4xl font-bold">
            Technologies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-8 gap-5 justify-center items-center">
            {portfolioJSON.technologies.map((skill, index) => {
              return (
                <Tooltip key={index} label={skill.description}>
                  <div className="flex flex-row gap-3 bg-white p-3 rounded-lg shadow-md hover:drop-shadow-2xl">
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      loading="lazy"
                      rel="dns-prefetch"
                      draggable={false}
                      width={24}
                      height={24}
                    />
                    <p className="text-black text-xl">{skill.name}</p>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
        {/* Projects */}
        <div id="projects" className="p-10 flex flex-col gap-3">
          <p className="text-center text-black text-4xl font-bold">
            My Projects
          </p>
          <p className="text-center text-black text-3xl">
            Check out my{" "}
            <Link href="https://github.com/Kooperlol" target="_blank">
              <span className="text-main">GitHub</span>
            </Link>{" "}
            for more!
          </p>
          <div className="flex lg:flex-row flex-col gap-5 p-5 justify-center lg:items-start items-center">
            {portfolioJSON.projects.map((project, index) => {
              return <ProjectCard key={index} {...project} />;
            })}
          </div>
        </div>
        {/* Contact */}
        <div className="bg-full p-10 flex flex-col items-center gap-3">
          <p className="text-center text-black text-4xl font-bold">
            Let's get in touch!
          </p>
          <Button
            backgroundColor={"#1463F3"}
            color={"white"}
            width={"min-content"}
            onClick={() => router.push("/contact")}
          >
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
}
