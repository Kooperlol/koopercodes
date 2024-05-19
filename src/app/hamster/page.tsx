"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import HamsterGif from "/public/images/hamster_wheel.gif";
import KooperParticles from "@/components/particles";

const HamsterPage = () => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [totalRotations, setTotalRotations] = useState<number>(0);
  const [maxRotations, setMaxRotations] = useState<number>(0);
  const [averageRotations, setAverageRotations] = useState<number>(0);
  const [innerX, setInnerX] = useState<number>(0);

  interface RotationDataEntry {
    timestamp: number;
    value: number;
  }
  
  interface RotationData {
    history: RotationDataEntry[];
  }
  
  const formatChartData = (data: RotationData): { name: string; value: number }[] => {
    if (!data || !data.history) {
      console.error("Invalid data format for chart. Missing required properties.");
      return [];
    }
  
    if (!Array.isArray(data.history) || data.history.length === 0) {
      console.error("Invalid data format for chart. Empty history array.");
      return [];
    }
  
    const filteredAndSortedData = data.history
      .filter((entry) => entry.value != null && typeof entry.timestamp === "number")
      .sort((a, b) => a.timestamp - b.timestamp);
  
    return filteredAndSortedData.map((entry) => ({
      name: new Date(entry.timestamp * 1000).toLocaleTimeString(),
      value: entry.value,
    }));
  };
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const apiUrlHistory = "https://hamster-api.vercel.app/api/rotations";
        const responseHistory = await axios.get(apiUrlHistory);
        const dataHistory = responseHistory.data;
        const formattedData = formatChartData(dataHistory as RotationData);
        setChartData(formattedData);

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

    setInnerX(window.innerWidth);

    window.addEventListener("resize", () => {
      setInnerX(window.innerWidth);
    });

    fetchData();
  }, []);

  return (
    <>
      <Image
        className="top-0 left-0 absolute object-cover w-screen h-screen"
        priority
        draggable={false}
        src="/images/banner.svg"
        fill
        alt={"Banner Image"}
      />
      <KooperParticles />

      <div className="min-h-screen items-center justify-center flex flex-col gap-5 lg:pt-0 pt-32 lg:px-0 px-8 lg:pb-0 pb-8">
        <h1
          className="lg:text-4xl text-3xl z-10 text-white"
          style={{
            textShadow:
              "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
          }}
        >
          My <b>Hamster</b>
        </h1>
        <div className="flex flex-col-reverse lg:flex-row gap-3">
          <Card className="p-4 items-center justify-center">
            <CardHeader>
              <h1 className="text-2xl text-center">Hamster Wheel Statistics</h1>
            </CardHeader>
            <CardBody>
              <div className="flex flex-row gap-1">
                <p>Total Rotations:</p>
                <Skeleton isLoaded={!isLoading}>
                  {totalRotations.toLocaleString()}
                </Skeleton>
              </div>
              <div className="flex flex-row gap-1">
                <p>Total Miles:</p>
                <Skeleton isLoaded={!isLoading}>
                  {(totalRotations * 0.00049589646).toFixed(5)}
                </Skeleton>
              </div>
              <div className="flex flex-row gap-1">
                <p>Average RPM:</p>
                <Skeleton isLoaded={!isLoading}>
                  {averageRotations.toLocaleString()}
                </Skeleton>
              </div>
              <div className="flex flex-row gap-1">
                <p>Record RPM:</p>
                <Skeleton isLoaded={!isLoading}>
                  {maxRotations.toLocaleString()}
                </Skeleton>
              </div>
            </CardBody>
            <CardFooter>
              <Image
                src={HamsterGif}
                alt="Hamster in a wheel"
                draggable={false}
                className="rounded-lg"
              />
            </CardFooter>
          </Card>
          <Card className="p-4 items-center justify-center text-center">
            <h1 className="text-2xl">Hamster Wheel Activity</h1>
            <h2 className="text-sm">Shows the activity of the past day</h2>
            <Skeleton isLoaded={!isLoading}>
              {innerX > 768 ? (
                <LineChart
                  width={730}
                  height={250}
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    verticalAlign="top"
                    wrapperStyle={{ lineHeight: "40px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Rotation Speed (RPM)"
                    stroke="#8884d8"
                  />
                </LineChart>
              ) : (
                <LineChart width={300} height={250} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    verticalAlign="top"
                    wrapperStyle={{ lineHeight: "40px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Rotation Speed (RPM)"
                    stroke="#8884d8"
                  />
                </LineChart>
              )}
            </Skeleton>
          </Card>
        </div>
      </div>
    </>
  );
};

export default HamsterPage;
