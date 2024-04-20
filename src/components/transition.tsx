"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface Variants {
  [key: string]: any;
}

const anim = (variants: Variants) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

export function Curve({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrollTop, setScrollTop] = useState(0);
  const [dimensions, setDimensions] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    setScrollTop(document.documentElement.scrollTop);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const routes: { [key: string]: string } = {
    "/": "Home",
    "/contact": "Contact",
  };

  if (scrollTop > 0) return <>{children}</>;

  return (
    <div className="page curve">
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="background"
      />
      <motion.p className="route" {...anim(text)}>
        {routes[pathname]}
      </motion.p>
      {dimensions.width != null && dimensions.height != null && (
        <SVG height={dimensions.height || 0} width={dimensions.width || 0} />
      )}
      {children}
    </div>
  );
}

const SVG = ({ height, width }: { height: number; width: number }) => {
  const initialPath = `
		M0 300 
		Q${width / 2} 0 ${width} 300
		L${width} ${height + 300}
		Q${width / 2} ${height + 600} 0 ${height + 300}
		L0 0
	`;

  const targetPath = `
		M0 300
		Q${width / 2} 0 ${width} 300
		L${width} ${height}
		Q${width / 2} ${height} 0 ${height}
		L0 0
	`;

  return (
    <motion.svg className={"svg"} {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};

const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: "47.5%" },
  },
  exit: {
    opacity: 1,
    top: "40%",
    transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] },
  },
};

const curve = (initialPath: any, targetPath: any) => {
  return {
    initial: {
      d: initialPath,
      fill: "#84A4FC",
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
      fill: "#84A4FC",
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      fill: "#84A4FC",
    },
  };
};

export default curve;

const translate = {
  initial: {
    top: "-300px",
  },
  enter: {
    top: "-100vh",
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: "100vh",
    },
  },
  exit: {
    top: "-300px",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};
