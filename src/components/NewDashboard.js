import React, { useEffect, useState } from "react";
import LiveChart from "./LiveChart";

export const NewDashboard = () => {
  const [Temperature, setTemperature] = useState(null);
  const [Humidity, setHumidity] = useState(null);
  const [LightingValue, setLightingvalue] = useState(null);
  const [Spark, SetSpark] = useState(null);
  const [Current, setCurrent] = useState(null);
  const [Voltage, setVoltage] = useState(null);


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
        "https://api.thingspeak.com/channels/2877696/feeds.json?api_key=G5EQIV6S4T04N32H";

       

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
            seriesName: "HUMIDITY",
          });

          setHumidity({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field2),
            color: "blue",
            seriesName: "TEMPERATURE",
          });

          setLightingvalue({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field3),
            color: "#ff4f4f",
            seriesName: "GAS",
          });
          SetSpark({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field4),
            color: "#ff4f4f",
            seriesName: "CURRENT LIGHT",
          });
          setCurrent({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field5),
            color: "#ff4f4f",
            seriesName: "OBJECT TEMP",
          });
          setVoltage({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field6),
            color: "#ff4f4f",
            seriesName: "RESISTANCE",
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

  if (!Temperature || !Humidity || !LightingValue || !Spark || !Current ) {
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
            data={[Humidity,Temperature]}
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
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">GAS</h2>
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
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">CURRENT LIGHT</h2>
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
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">TEMPERATURE</h2>
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
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">RESISTANCE</h2>
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


      </div>
    </div>
  );
};



