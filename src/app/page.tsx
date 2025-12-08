"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import KooperParticles from "@/components/particles";
import { useRouter } from "next/navigation";
import kooperimage from "@/../public/images/kooper.webp";
import { HiAcademicCap, HiBriefcase, HiQrCode, HiCog } from "react-icons/hi2";
import { Button } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import LetterPullup from "@/components/ui/letter-pullup";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
      <Navbar />

      <Image
        className="top-0 left-0 absolute object-cover w-full h-full opacity-20"
        priority
        draggable={false}
        src="/images/banner.svg"
        width={1920}
        height={1080}
        alt={"Banner Image"}
      />
      <KooperParticles />
      <div className="container flex flex-col max-w-7xl mx-auto px-4 pt-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          id="header"
          className="min-h-[100vh] relative flex 2xl:flex-row flex-col-reverse 2xl:text-left text-center 2xl:justify-between justify-center items-center py-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            ref={headerRef}
            className="flex flex-col 2xl:gap-5 gap-0 lg:items-start items-center z-10"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-blue-400 2xl:text-4xl text-2xl font-light tracking-wider"
            >
              Hello, I'm
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white 2xl:text-9xl text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 max-w-full break-words"
            >
              Kooper
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="max-w-full px-4"
            >
              <LetterPullup
                className="text-gray-300 2xl:text-4xl text-xl font-normal break-words"
                words="Computer Science Student"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col md:flex-row gap-4 mt-4"
            >
              <Button
                onClick={() => router.push("/contact")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
              >
                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="currentColor"
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
                Get in Touch
              </Button>
              <Button
                onClick={() =>
                  window.open("https://github.com/Kooperlol", "_blank")
                }
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
              >
                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
                GitHub
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/kooperpropp/",
                    "_blank"
                  )
                }
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
              >
                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="currentColor"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
                LinkedIn
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/kooperpropp/overlay/1765226637795/single-media-viewer/?profileId=ACoAAEUZCCgBhrHsFBkox_5GAfDSveox06LGlL0",
                    "_blank"
                  )
                }
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
              >
                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="currentColor"
                    d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                  />
                </svg>
                Resume
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10"
          >
            <Image
              priority
              className="lg:w-[500px] w-[300px] rounded-full border-4 border-blue-400/30 shadow-lg shadow-blue-500/20"
              style={{
                opacity: isHeaderInView ? 1 : 0,
                transform: isHeaderInView ? "none" : "translateX(200px)",
                transitionProperty: "transform, opacity",
                transitionDuration: "0.9s",
                transitionTimingFunction: "cubic-bezier(0.17, 0.55, 0.55, 1)",
              }}
              src={kooperimage}
              alt="Portrait of Kooper Propp"
              draggable={false}
              width={500}
              height={500}
            />
          </motion.div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="about"
          className="py-32 flex flex-col text-lg text-white text-center gap-3 items-center justify-center border-t border-b border-gray-700/30"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About Me
          </h2>
          <p className="max-w-2xl text-gray-300 leading-relaxed">
            I'm a dedicated Computer Science student with a passion for building
            efficient, scalable, and user-focused applications. My expertise
            spans full-stack web development, software design, and creating
            systems that solve real-world problems.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="education"
          className="py-32 flex flex-col gap-3 items-center justify-center border-b border-gray-700/30"
        >
          <div className="flex items-center gap-2">
            <HiAcademicCap className="text-4xl text-blue-400" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Education
            </h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl w-full bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700/50"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <Image
                  src="/images/UWL.png"
                  alt="University of Wisconsin-La Crosse Logo"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  University of Wisconsin-La Crosse
                </h3>
                <p className="text-xl mb-4 text-blue-400">
                  Bachelor of Science in Computer Science — AI Concentration,
                  Information Systems Minor
                </p>
                <p className="text-gray-400 mb-4">
                  Expected Graduation: Fall 2027
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="experience"
          className="py-32 flex flex-col gap-3 items-center justify-center border-b border-gray-700/30"
        >
          <div className="flex items-center gap-2">
            <HiBriefcase className="text-4xl text-blue-400" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Professional Experience
            </h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl w-full space-y-8"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-xl border border-gray-700/50 hover:border-blue-400/50 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <div className="w-full md:w-1/3 flex justify-center">
                  <Image
                    src="/images/harbor-logo.png"
                    alt="The Harbor at Newville Logo"
                    width={200}
                    height={200}
                    className="rounded-lg w-48 h-48 md:w-auto md:h-auto object-contain"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="text-center md:text-left">
                    <a
                      href="https://www.theharboratnewville.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        Website Developer
                      </h3>
                      <p className="text-sm md:text-base text-blue-400">
                        The Harbor at Newville
                      </p>
                      <p className="text-sm md:text-base text-gray-400">
                        November 2025
                      </p>
                    </a>
                  </div>
                  <ul className="mt-4 space-y-2 text-left">
                    {[
                      "Rebuilt and deployed a Next.js website with Tailwind and Strapi, consolidating multiple tools into a single platform with faster load times, mobile-friendly pages, and simplified content management.",
                      "Developed a custom inventory system for boats and motors, enabling real-time updates, improving efficiency, and reducing administrative overhead.",
                      "Redesigned the website layout with optimized SEO, clean forms, and automated email notifications, boosting discoverability and customer interaction.",
                      "Implemented a self-managed admin UI, allowing the client to control content, inventory, and forms independently, streamlining workflow.",
                    ].map((achievement, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex items-start text-gray-300"
                      >
                        <MdCheckCircle className="text-blue-400 text-xl mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm md:text-base">
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl w-full space-y-8"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-xl border border-gray-700/50 hover:border-blue-400/50 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <div className="w-full md:w-1/3 flex justify-center">
                  <Image
                    src="/images/lakeview.png"
                    alt="Pettit's Lakeview Campground & Bar Logo"
                    width={200}
                    height={200}
                    className="rounded-lg w-48 h-48 md:w-auto md:h-auto object-contain bg-white p-5"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      Freelance Developer
                    </h3>
                    <p className="text-sm md:text-base text-blue-400">
                      Pettit's Lakeview Campground & Bar
                    </p>
                    <p className="text-sm md:text-base text-gray-400">
                      June 2025 - August 2025
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 text-left">
                    {[
                      "Developed a high-performance Next.js website with headless WordPress integration, resulting in a 20% increase in user engagement and supporting 5,000+ monthly visitors.",
                      "Designed and implemented a QR-code based inventory management system for tracking sauce batches, containers, and shelf life to optimize restaurant operations.",
                      "Built a comprehensive recipe management website for kitchen staff to efficiently track recipes and ingredient requirements.",
                    ].map((achievement, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex items-start text-gray-300"
                      >
                        <MdCheckCircle className="text-blue-400 text-xl mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm md:text-base">
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="projects"
          className="py-32 flex flex-col gap-3 items-center justify-center border-b border-gray-700/30"
        >
          <div className="flex items-center gap-2">
            <HiQrCode className="text-4xl text-blue-400" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Featured Projects
            </h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl w-full space-y-8"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-xl border border-gray-700/50 hover:border-blue-400/50 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <div className="w-full md:w-1/3 flex justify-center">
                  <Image
                    src="/images/laude.png"
                    alt="MHS Laude System Screenshot"
                    width={200}
                    height={200}
                    className="rounded-lg w-48 h-48 md:w-auto md:h-auto object-contain"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="text-center md:text-left">
                    <a
                      href="https://github.com/Kooperlol/mhslaude"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        MHS Laude System
                      </h3>
                      <p className="text-sm md:text-base text-blue-400">
                        Next.js, TypeScript, Python, Chakra UI
                      </p>
                    </a>
                  </div>
                  <div className="mt-2 text-left">
                    <p className="text-sm md:text-base text-gray-300">
                      An automated transcript processing and academic
                      distinction tracking platform tailored for high schools.
                      The system calculates laude standings, GPA, and
                      progression insights, giving students and administrators
                      an intuitive way to track academic performance.
                    </p>
                    <p className="text-sm md:text-base text-blue-400 mt-2">
                      Deployed at Milton High School, where it actively supports
                      hundreds of students in monitoring their academic success
                      in real time.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nexa Database */}
            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-xl border border-gray-700/50 hover:border-blue-400/50 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <div className="w-full md:w-1/3 flex justify-center">
                  <Image
                    src="/images/nexa.png"
                    alt="Nexa Database Project Screenshot"
                    width={200}
                    height={200}
                    className="rounded-lg w-48 h-48 md:w-auto md:h-auto object-contain"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="text-center md:text-left">
                    <a
                      href="https://github.com/Kooperlol/nexadb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        Nexa Database
                      </h3>
                      <p className="text-sm md:text-base text-blue-400">
                        Next.js, TypeScript, Prisma, MongoDB, Chakra UI
                      </p>
                    </a>
                  </div>
                  <div className="mt-2 text-left">
                    <p className="text-sm md:text-base text-gray-300">
                      A fully featured careers platform for a fictional database
                      company, built with modern full-stack technologies.
                      Designed to showcase industry-level practices in
                      scalability, responsive design, and seamless user
                      experience.
                    </p>
                    <p className="text-sm md:text-base text-blue-400 mt-2">
                      Earned 1st place in Wisconsin and 4th place nationally in
                      the FBLA Website Coding & Development competition.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Milton Relay */}
            <motion.div
              variants={fadeInUp}
              className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-xl border border-gray-700/50 hover:border-blue-400/50 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <div className="w-full md:w-1/3 flex justify-center">
                  <Image
                    src="/images/relay.png"
                    alt="Milton Relay App Screenshot"
                    width={200}
                    height={200}
                    className="rounded-lg w-48 h-48 md:w-auto md:h-auto object-contain"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="text-center md:text-left">
                    <a
                      href="https://github.com/Kooperlol/milton_relay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        Milton Relay
                      </h3>
                      <p className="text-sm md:text-base text-blue-400">
                        Flutter, Dart, Firebase
                      </p>
                    </a>
                  </div>
                  <div className="mt-2 text-left">
                    <p className="text-sm md:text-base text-gray-300">
                      A cross-platform real-time communication app for schools,
                      enabling seamless announcements, messaging, and
                      collaboration between staff and students. Developed with a
                      focus on reliability and accessibility for educational
                      environments.
                    </p>
                    <p className="text-sm md:text-base text-blue-400 mt-2">
                      Won 1st place in Wisconsin and 4th place nationally in the
                      FBLA Mobile App Development competition.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="skills"
          className="py-32 flex flex-col gap-3 items-center justify-center border-b border-gray-700/30"
        >
          <div className="flex items-center gap-2">
            <HiCog className="text-4xl text-blue-400" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Technical Skills
            </h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl w-full bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Programming Languages",
                  skills: "Java, Kotlin, JavaScript/TypeScript, Dart, Python",
                },
                {
                  title: "Frameworks & Libraries",
                  skills: "React, Next.js, Flask, Flutter, Spring Boot",
                },
                {
                  title: "Databases & Storage",
                  skills: "Firebase, MongoDB, SQL, FileMaker",
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`md:col-span-2`}
                >
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-300">{category.skills}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-32 flex flex-col items-center gap-8 relative w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
          <div className="relative z-10 text-center w-full max-w-6xl mx-auto px-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6 leading-relaxed">
              Let's Connect
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              I am always interested in discussing new projects, innovative
              ideas, or opportunities to contribute to your vision. Feel free to
              reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/contact")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Send Message
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
