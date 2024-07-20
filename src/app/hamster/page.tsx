"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Skeleton } from "@chakra-ui/react";
import AnimatedNumber from "react-animated-numbers";
import axios from "axios";
import { compareHamsterRunToStates } from "@/utils/state-compare";
import DailyRotations from "@/components/hamster/daily";

const HamsterPage = () => {
  const [totalRotations, setTotalRotations] = useState<number>(0);
  const [maxRotations, setMaxRotations] = useState<number>(0);
  const [averageRotations, setAverageRotations] = useState<number>(0);
  const rotationMiles = 0.000495;
  const [isLoading, setIsLoading] = useState(false);
  const totalMiles = totalRotations * rotationMiles;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const apiUrlTotal = "https://hamster-api.vercel.app/api/total";
        const responseTotal = await axios.get(apiUrlTotal);
        const dataTotal = responseTotal.data.total_rotations;
        setTotalRotations(dataTotal as number);

        const apiUrlMax = "https://hamster-api.vercel.app/api/max";
        const responseMax = await axios.get(apiUrlMax);
        const dataMax = responseMax.data.max_rotation;
        setMaxRotations(dataMax as number);

        const apiUrlAverage = "https://hamster-api.vercel.app/api/average";
        const responseAverage = await axios.get(apiUrlAverage);
        const dataAverage = responseAverage.data.average_rotations;
        setAverageRotations(dataAverage as number);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="parallax">
        <div className="parallax__layer parallax__layer--desktop" />
        <div className="flex flex-col items-center justify-center h-screen p-8 lg:p-0">
          <div className="gap-4 w-full h-full items-center flex flex-col lg:flex-row justify-center lg:justify-between lg:px-32 z-10">
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <h1 className="lg:text-9xl text-7xl relative">
                Meet <b>Bear</b>🐻,
              </h1>
              <h1 className="lg:text-7xl text-4xl text-white">
                My <i>Adventurous</i> Hamster
              </h1>
              <h1 className="lg:text-5xl text-3xl text-white">
                Scroll down to see some statistics!
              </h1>
            </div>
            <motion.div
              animate={{
                y: [20, -20, 20],
              }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image
                className="select-none"
                priority
                src="/images/hamster.png"
                draggable={false}
                width={500}
                height={500}
                alt="Hamster floating up and down"
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div
        className="relative min-h-screen py-12 flex items-center justify-center"
        style={{
          background: "#ADD8E6",
        }}
      >
        <motion.div
          className="absolute top-3 right-0 hidden lg:block z-0"
          animate={{
            y: [20, -20, 20],
          }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            className="select-none"
            priority
            src="/images/flying-hamster.png"
            draggable={false}
            width={400}
            height={400}
            alt="Hamster floating up and down"
          />
        </motion.div>
        <Image
          className="select-none absolute hidden lg:block bottom-0 left-0 z-0"
          priority
          src="/images/wheel.png"
          draggable={false}
          width={400}
          height={400}
          alt="Hamster wheel"
        />
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-center">
          <Card
            className="card-with-filter"
            style={
              {
                "--background-image": "url('/images/winner.png')",
              } as React.CSSProperties
            }
          >
            <div className="flex items-center justify-center flex-col gap-1 text-white">
              <p className="text-center text-9xl">🏆</p>
              <p className="text-center text-5xl">Record RPM</p>
              <Skeleton isLoaded={!isLoading}>
                <p className="flex flex-row justify-center text-white text-8xl font-bold">
                  <AnimatedNumber
                    animateToNumber={maxRotations}
                    transitions={(index) => ({
                      type: "tween",
                      duration: index + 1,
                    })}
                  />
                </p>
              </Skeleton>
            </div>
          </Card>

          <Card
            p={3}
            style={
              {
                "--background-image": "url('/images/average.jpg')",
              } as React.CSSProperties
            }
            className="card-with-filter"
          >
            <div className="flex flex-col gap-1 text-white">
              <p className="text-center text-9xl">📊</p>
              <p className="text-center text-5xl">Average RPM</p>
              <Skeleton isLoaded={!isLoading}>
                <p className="flex flex-row justify-center text-white text-8xl font-bold">
                  <AnimatedNumber
                    animateToNumber={Number(averageRotations.toFixed(0))}
                    transitions={(index) => ({
                      type: "tween",
                      duration: index + 1,
                    })}
                  />
                </p>
              </Skeleton>
            </div>
          </Card>

          <Card
            p={3}
            style={
              {
                "--background-image": "url('/images/wheel.jpg')",
              } as React.CSSProperties
            }
            className="card-with-filter"
          >
            <div className="flex flex-col gap-1 text-white">
              <p className="text-center text-9xl">🥵</p>
              <p className="text-center text-5xl">Total Rotations</p>
              <Skeleton isLoaded={!isLoading} width={"700px"}>
                <p className="flex flex-row justify-center text-white text-8xl font-bold">
                  <AnimatedNumber
                    includeComma={true}
                    animateToNumber={totalRotations}
                    transitions={(index) => ({
                      type: "tween",
                      duration: index + 1,
                    })}
                  />
                </p>
              </Skeleton>
            </div>
          </Card>

          <Card
            p={3}
            style={
              {
                "--background-image": "url('/images/map.jpg')",
              } as React.CSSProperties
            }
            className="card-with-filter"
          >
            <div className="flex flex-col gap-1  text-white">
              <p className="text-center text-9xl">🗺️</p>
              <p className="text-center text-5xl">Total Miles</p>
              <Skeleton isLoaded={!isLoading}>
                <p className="flex flex-row justify-center text-white text-8xl font-bold">
                  <AnimatedNumber
                    includeComma={true}
                    animateToNumber={Number(totalMiles.toFixed(0))}
                    transitions={(index) => ({
                      type: "tween",
                      duration: index + 1,
                    })}
                  />
                </p>
              </Skeleton>
              <Skeleton
                isLoaded={!isLoading}
                style={{
                  textWrap: "wrap",
                  width: "300px",
                }}
                lineHeight={2}
              >
                <p className="text-center">
                  {compareHamsterRunToStates(totalMiles)}
                </p>
              </Skeleton>
            </div>
          </Card>
        </div>
      </div>
      <div
        className="min-h-screen h-screen py-12 flex items-center justify-center"
        style={{
          background: "#F08080",
        }}
      >
        <div className="h-2/3 w-3/4">
          <DailyRotations />
        </div>
      </div>
    </div>
  );
};

export default HamsterPage;
