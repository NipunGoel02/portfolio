import { abilities } from "../constants";
import { useTheme } from "../context/ThemeContext";

const FeatureCards = () => {
  const { theme } = useTheme(); // Correct placement of the useTheme hook

  return (
    <div className="w-full px-lg">
      <div className="mx-auto grid grid-cols-3 gap-4">
        {abilities.map(({ imgPath, title, desc }) => (
          <div
            key={title}
            className={`${
              theme === "light" ? "bg-[#abf7b1]" : "bg-[#1e293b]"
            } card-border rounded-xl p-8 flex flex-col gap-4`}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full">
              <img src={imgPath} alt={title} />
            </div>
            <h3 className={`${theme === "light" ? "text-black-100" : "text-white"}text-2xl font-semibold mt-2`}>{title}</h3>
            <p className={`${theme === "light" ? "text-black-50" : "text-white" } opacity-50 text-lg`}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
