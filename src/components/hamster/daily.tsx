import { Card, CardBody, CardHeader, Skeleton } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Title,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend,
  Filler
);

const DailyRotations = () => {
  const [rotationData, setRotationData] = useState<
    { date: string; value: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  interface RotationDataEntry {
    timestamp: number;
    value: number;
  }

  interface RotationData {
    history: RotationDataEntry[];
  }

  const formatRotationData = (
    data: RotationData
  ): { date: string; value: number }[] => {
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
      date: new Date(entry.timestamp * 1000).toISOString(),
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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="p-6 w-full h-full">
      <CardHeader className="text-center">
        <h1 className="text-2xl">🐹 Hamster Wheel Activity</h1>
        <h2 className="text-sm">Shows the activity of the past day</h2>
      </CardHeader>
      <CardBody className="w-full h-full">
        <Skeleton isLoaded={!isLoading} className="w-full h-full">
          <Line
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Hamster Wheel Activity Over the Past Day",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.dataset.label || "";
                      const value = context.raw;
                      const time = context.label;
                      return `${label}: ${value} rotations at ${time}`;
                    },
                  },
                },
                legend: {
                  display: true,
                  position: "top",
                },
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
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Time",
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Rotations per Minute",
                  },
                  grid: {
                    color: "rgba(200, 200, 200, 0.2)",
                  },
                },
              },
            }}
            data={{
              labels: rotationData.map((entry) => {
                const entryDate = new Date(entry.date);
                return entryDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }),
              datasets: [
                {
                  label: "Rotations per Minute",
                  data: rotationData.map((entry) => entry.value),
                  fill: true,
                  backgroundColor: "rgba(20, 99, 243, 0.1)",
                  borderColor: "#1463F3",
                  pointBackgroundColor: "#1463F3",
                  pointBorderColor: "#fff",
                  tension: 0.4,
                },
              ],
            }}
          />
        </Skeleton>
      </CardBody>
    </Card>
  );
};

export default DailyRotations;
