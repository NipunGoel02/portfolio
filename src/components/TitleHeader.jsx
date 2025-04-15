import { useTheme } from "../context/ThemeContext";
const TitleHeader = ({ title, sub }) => {
   const theme = useTheme();

  return (
    <div className="flex flex-col items-center gap-10">
      <div className={` ${theme === 'light' ? 'bg-[#abfb71]' : 'bg-[#abfb71]'} hero-badge`}>
        <p className="text-black">{sub}</p>
      </div>
      <div style={{ color: theme === 'light' ? 'var(--text-color)' : 'var(--text-color)' }}>
        <h1 className="font-semibold md:text-5xl text-xl text-center">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TitleHeader;
