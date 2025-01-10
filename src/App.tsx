import toast, { Toaster } from "react-hot-toast";
import ColorCard from "./components/ColorCard";
import { useEffect, useState } from "react";

function App() {
  const [colors, setColors] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("default");

  const fetchColorsFromAPI = async () => {
    setLoading(true);
    try {
      const response1 = await fetch("http://colormind.io/api/", {
        method: "POST",
        body: JSON.stringify({
          model: selectedModel,
          input: ["N", "N", "N", "N", "N"],
        }),
      });
      const response2 = await fetch("http://colormind.io/api/", {
        method: "POST",
        body: JSON.stringify({
          model: selectedModel,
          input: ["N", "N", "N", "N", "N"],
        }),
      });

      const data1 = await response1.json();
      const data2 = await response2.json();

      const combinedColors = [...data1.result, ...data2.result]
        .slice(0, 8)
        .map(
          (rgb: number[]) =>
            `#${rgb[0].toString(16).padStart(2, "0")}${rgb[1]
              .toString(16)
              .padStart(2, "0")}${rgb[2].toString(16).padStart(2, "0")}`
        );

      setColors(combinedColors);
      setLoading(false);
    } catch (err) {
      toast.error(`An error has occurred: ${err}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://colormind.io/list/");
      const data = await response.json();
      setModels(data.result);
    })();
    fetchColorsFromAPI();
  }, [selectedModel]);

  return (
    <div className="px-10 py-5 bg-[#1C2429] text-white min-h-screen">
      <Toaster position="bottom-right" reverseOrder={false} />
      <header className="md:place-items-start sm:px-0 sm:place-items-center place-items-start grid md:grid-cols-7 sm:grid-cols-3 grid-cols-1 mb-10 ">
        <h1 className=" text-3xl font-semibold text-green-500 md:col-span-3 col-span-1">
          Color<span className="text-green-100">Generator</span>
        </h1>
        <div className=" flex items-center gap-2 md:col-span-3 sm:col-start-3 sm:col-span-2 sm:pt-0 pt-5 col-start-1">
          <label className="text-green-100 font-medium" htmlFor="models">
            Model:
          </label>
          <select
            name="models"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-4 py-1 bg-[#1C2429] border border-green-700 rounded"
          >
            {models.map((model) => (
              <option value={model}>{model}</option>
            ))}
          </select>
        </div>

        <button
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition duration-300 ease-in-out sm:col-span-1 md:mt-0 mt-5 sm:place-self-end place-self-center md:col-start-7 sm:col-start-2 col-start-1 w-full"
          onClick={fetchColorsFromAPI}
        >
          Generate
        </button>
      </header>
      {loading ? (
        <div className="relative h-96">
          <span className="loading loading-dots loading-lg text-green-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2"></span>
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 shadow-md md:pb-0 mb-20">
          {colors.map((color, i) => (
            <ColorCard key={i} color={color} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
