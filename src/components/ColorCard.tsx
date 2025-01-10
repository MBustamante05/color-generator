import { Copy } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  color: string;
};
function ColorCard({ color }: Props) {
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };
  return (
    <div style={{ backgroundColor: color }} className="relative h-72">
      
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-9 flex items-center gap-2 cursor-pointer ${
          color.toLocaleLowerCase().startsWith("#f") || color.toLocaleLowerCase().startsWith("#e") || color.toLocaleLowerCase().startsWith("#cf")
            ? "text-black"
            : "text-white"
        }`}
        onClick={handleCopyLink}
      >
        {color.toUpperCase()}
        <Copy className="w-4 h-4 " />
      </div>
    </div>
  );
}

export default ColorCard;
