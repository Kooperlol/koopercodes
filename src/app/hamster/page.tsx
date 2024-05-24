"use client";
import { Card, CardBody, CardHeader, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import KooperParticles from "@/components/particles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const HamsterPage = () => {
  const [rotationData, setRotationData] = useState<
    { date: Date; value: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRotations, setTotalRotations] = useState<number>(0);
  const [maxRotations, setMaxRotations] = useState<number>(0);
  const [averageRotations, setAverageRotations] = useState<number>(0);

  interface RotationDataEntry {
    timestamp: number;
    value: number;
  }

  interface RotationData {
    history: RotationDataEntry[];
  }

  const formatRotationData = (
    data: RotationData
  ): { date: Date; value: number }[] => {
    if (!data || !data.history) {
      console.error(
        "Invalid data format for chart. Missing required properties."
      );
      return [];
    }

    if (!Array.isArray(data.history) || data.history.length === 0) {
      console.error("Invalid data format for chart. Empty history array.");
      return [];
    }

    const filteredAndSortedData = data.history
      .filter(
        (entry) => entry.value != null && typeof entry.timestamp === "number"
      )
      .sort((a, b) => a.timestamp - b.timestamp);

    return filteredAndSortedData.map((entry) => ({
      date: new Date(entry.timestamp * 1000),
      value: entry.value,
    }));
  };

  useEffect(() => {
    if (typeof window !== "undefined")
      import("chartjs-plugin-zoom").then((plugin) => {
        ChartJS.register(plugin.default);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const apiUrlHistory = "https://hamster-api.vercel.app/api/rotations";
        const responseHistory = await axios.get(apiUrlHistory);
        const dataHistory = responseHistory.data;
        const formattedData = formatRotationData(dataHistory as RotationData);
        setRotationData(formattedData);

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
    <div className="relative">
      <Image
        className="top-0 left-0 absolute object-cover w-screen h-screen"
        priority
        draggable={false}
        src="/images/banner.svg"
        fill
        alt="Banner Image"
      />
      <KooperParticles />

      <div className="flex flex-col items-center justify-center h-screen p-8 lg:p-0">
        <div className="w-full h-4/5 lg:w-10/12 z-10">
          <h1
            className="lg:text-4xl text-3xl text-white text-center mb-8"
            style={{
              textShadow:
                "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
            }}
          >
            My <b>Hamster</b>
          </h1>
          <Card className="p-6 w-full h-full">
            <CardHeader className="text-center">
              <h1 className="text-2xl">Hamster Wheel Activity</h1>
              <h2 className="text-sm">Shows the activity of the past day</h2>
            </CardHeader>
            <div className="flex flex-col items-center justify-center gap-2 mb-4">
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
            </div>
            <CardBody className="w-full h-full">
              <Skeleton isLoaded={!isLoading} className="w-full h-full">
                <Line
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      zoom: {
                        pan: {
                          enabled: true,
                          mode: "x",
                          scaleMode: "y",
                        },
                        zoom: {
                          wheel: {
                            enabled: true,
                          },
                          pinch: {
                            enabled: true,
                          },
                          mode: "x",
                          scaleMode: "y",
                        },
                      },
                    },
                  }}
                  data={{
                    labels: rotationData.map((entry) =>
                      entry.date.toLocaleTimeString()
                    ),
                    datasets: [
                      {
                        label: "Rotations per Minute",
                        data: rotationData.map((entry) => entry.value),
                        fill: false,
                        borderColor: "#1463F3",
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </Skeleton>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HamsterPage;
