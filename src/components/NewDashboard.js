import React, { useEffect, useState } from "react";
import LiveChart from "./LiveChart";

export const NewDashboard = () => {
  const [Temperature, setTemperature] = useState(null);
  const [Humidity, setHumidity] = useState(null);
  const [LightingValue, setLightingvalue] = useState(null);
  const [Spark, SetSpark] = useState(null);
  const [Current, setCurrent] = useState(null);
  const [Voltage, setVoltage] = useState(null);
  const [GroundResistance, setGroundResistance] = useState(null);

  const controls = {
    show: true,
    download: true,
    selection: false,
    zoom: false,
    zoomin: true,
    zoomout: true,
    pan: true,
    reset: true,
    zoomEnabled: true,
    autoSelected: "zoom",
  };

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.thingspeak.com/channels/2859542/feeds.json?api_key=VSVACHWZXQGKTAUL";

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched Data:", data);

        if (data?.feeds?.length > 0) {
          const xAxis = data.feeds.map((feed) => new Date(feed.created_at).getTime());

          setTemperature({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field1),
            color: "green",
            seriesName: "Temperature",
          });

          setHumidity({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field2),
            color: "blue",
            seriesName: "Humidity",
          });

          setLightingvalue({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field3),
            color: "#ff4f4f",
            seriesName: "Lighting value",
          });
          SetSpark({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field4),
            color: "#ff4f4f",
            seriesName: "Spark",
          });
          setCurrent({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field5),
            color: "#ff4f4f",
            seriesName: "Current",
          });
          setVoltage({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field6),
            color: "#ff4f4f",
            seriesName: "Voltage",
          });
          setGroundResistance({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field7),
            color: "#ff4f4f",
            seriesName: "Ground Resistance",
          });
        }
      } catch (error) {
        console.error("Error fetching data from ThingSpeak:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!Temperature || !Humidity || !LightingValue || !Spark || !Current || !GroundResistance) {
    return <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">
      Lightning Arrester Monitor  
      </h1>

      {/* Charts Section */}
      <div className=" flex-wrap flex justify-center gap-10">
        {/* Combined Chart */}
        <div className="flex justify-center">
        <div className="bg-gray-100  w-[350px] sm:w-[600px]  shadow-lg rounded-lg p-5">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Combined Chart</h2>
          <LiveChart
            data={[Temperature,Humidity]}
            title="Combined Chart"
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
        </div>


        {/* LightingValue Chart */}
        <div className="flex justify-center">
        <div className="bg-gray-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Lighting Value</h2>
          <LiveChart
            data={[LightingValue]}
            title={LightingValue.seriesName}
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
        </div>


        {/* Spark Chart */}
        <div className="flex justify-center">
        <div className="bg-gray-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Spark</h2>
          <LiveChart
            data={[Spark]}
            title={Spark.seriesName}
            lineStyle="smooth"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
        </div>


        {/* Current Chart */}
        <div className="flex justify-center">
        <div className="bg-gray-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5 ">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Current</h2>
          <LiveChart
            data={[Current]}
            title={Current.seriesName}
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
            
          />
        </div>
        </div>

                {/* Voltage Chart */}
                <div className="flex justify-center">
                <div className="bg-gray-100 w-[350px] sm:w-[600px]  shadow-lg rounded-lg p-5 ">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Voltage</h2>
          <LiveChart
            data={[Voltage]}
            title={Voltage.seriesName}
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
            
          />
        </div>
                </div>

                        {/* GroundResistance Chart */}
<div className="flex justify-center ">
<div className="bg-gray-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5 ">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Ground Resistance</h2>
          <LiveChart
            data={[GroundResistance]}
            title={GroundResistance.seriesName}
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
            
          />
        </div>
</div>
      </div>
    </div>
  );
};



