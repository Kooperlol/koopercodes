"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import KooperParticles from "@/components/particles";
import portfolioJSON from "@/../public/config/portfolio.json";
import ProjectCard from "@/components/project-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import kooperimage from "@/../public/images/kooper.webp";
import { HiMiniDocumentText } from "react-icons/hi2";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import hamsterIcon from "@/../public/images/hamster.png";
import LetterPullup from "@/components/ui/letter-pullup";
import PulsatingButton from "@/components/ui/pulsating-button";
import IconCloud from "@/components/ui/icon-cloud";

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeaderInView, setIsHeaderInView] = useState(false);
  const [width, setWidth] = useState<number>(0);
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

    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));

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
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          right: "0",
          zIndex: 1000,
        }}
      >
        <div
          className="flex flex-row gap-3 items-center bg-white p-4 shadow-md rounded-l-full hover:shadow-lg cursor-pointer hover:scale-110 transform transition-transform"
          onClick={() => router.push("/hamster")}
          style={{
            width: width < 640 ? "60px" : "100px",
            height: width < 640 ? "60px" : "100px",
          }}
        >
          <Image
            priority
            draggable={false}
            src={hamsterIcon}
            content="fill"
            alt={"Hamster"}
          />
        </div>
      </div>
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
            className="flex flex-col 2xl:gap-5 gap-0 lg:items-start items-center"
          >
            <p className="white 2xl:text-4xl text-2xl">👋 Hello, I'm</p>
            <p className="white 2xl:text-8xl text-4xl">
              <b>Kooper Propp</b>
            </p>
            <LetterPullup
              className="text-white 2xl:text-4xl text-2xl font-normal"
              words="Computer Science Student"
            />
            <div className="flex flex-row gap-3">
              <Tooltip label="GitHub">
                <a href="https://github.com/Kooperlol" target="_blank">
                  <IconButton
                    padding={"5px"}
                    aria-label="github"
                    icon={
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>GitHub</title>
                        <path
                          fill="#1463F3"
                          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        />
                      </svg>
                    }
                  />
                </a>
              </Tooltip>
              <Tooltip label="LinkedIn">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/kooper-propp-ab42a0284/"
                >
                  <IconButton
                    padding={"5px"}
                    aria-label="linkedin"
                    icon={
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>LinkedIn</title>
                        <path
                          fill="#1463F3"
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                    }
                  />
                </a>
              </Tooltip>
              <Tooltip label="Resume">
                <a href="/Resume.pdf" target="_blank">
                  <IconButton
                    aria-label="Resume"
                    icon={<HiMiniDocumentText fill="#1463F3" size={"fill"} />}
                  />
                </a>
              </Tooltip>
            </div>
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
          className="p-10 flex flex-col text-lg text-black text-center gap-3 items-center justify-center"
        >
          <p className="text-4xl font-bold">About</p>
          <p>👨‍💻 Grade: College senior</p>
          <p>💻 Major: Computer Science</p>
          <p>🌍 Location: Edgerton, WI</p>
          <p>🎓 University: Southern New Hampshire University</p>
        </div>
        {/* Technologies */}
        <div
          id="technologies"
          className="bg-full p-10 flex flex-col gap-3 items-center justify-center"
        >
          <p className="text-center text-black text-4xl font-bold">
            Technologies
          </p>
          <div className="flex flex-col md:flex-row items-center gap-12 justify-center">
            <Box className="w-5/6 lg:w-1/3">
              <IconCloud
                iconSlugs={
                  portfolioJSON.technologies?.map((skill) =>
                    skill.name.toLowerCase()
                  ) || []
                }
              />
            </Box>

            <div className="flex items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-min justify-center items-center">
                {portfolioJSON.technologies.map((skill, index) => {
                  return (
                    <Tooltip key={index} label={skill.description}>
                      <div className="flex flex-row gap-3 justify-center bg-white p-3 rounded-lg shadow-md hover:drop-shadow-2xl hover:scale-110">
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
        <div className="bg-full p-10 flex flex-col items-center gap-5">
          <p className="text-center text-black text-4xl font-bold">
            Let's get in touch!
          </p>
          <PulsatingButton
            color={"blue"}
            onClick={() => router.push("/contact")}
          >
            Contact Me
          </PulsatingButton>
        </div>
      </div>
    </div>
  );
}
