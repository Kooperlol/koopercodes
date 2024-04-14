import React, { useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Container } from "@tsparticles/engine";
import { useInView } from "framer-motion";

const KooperParticles = () => {
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
    <>
      <div ref={headerRef} />
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
    </>
  );
};

export default KooperParticles;
