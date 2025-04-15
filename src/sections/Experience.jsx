import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Bookmart",
    date: "2024",
    description:
      "Bookmart is a platform where users can buy and sell old books. It features seamless transaction flows for both buyers and sellers, with a smooth user interface.",
    techStack: ["MongoDB", "Express", "Node.js", "React"],
    imagePath: "/images/image.png",
  },
  {
    title: "AI Resume Analyzer",
    date: "2024",
    description:
      "AI Resume Analyzer uses Gemini AI to evaluate resumes. It provides a score, lists missing skills, highlights keywords, and offers improvement suggestions.",
    techStack: ["Node.js", "Express", "MongoDB", "Gemini AI", "React"],
    imagePath: "/images/project2.png",
  },
  {
    title: "AI Code Collab",
    date: "2025",
    description:
      "AI Code Collab is a collaborative coding platform. It integrates with Gemini AI, allowing you to chat with collaborators, interact with AI for code generation, and run the code directly in the browser.",
    techStack: ["React", "Node.js", "Gemini AI", "WebRTC"],
    imagePath: "/images/project3.png",
  },
  {
    title: "Git Hunter",
    date: "TBD",
    description:
      "Git Hunter is a tool for discovering and exploring open-source repositories based on specific search criteria. It provides an intelligent search mechanism for GitHub projects.",
    techStack: ["Node.js", "React", "GitHub API"],
    imagePath: "/images/githunter.png",
  },
  {
    title: "Note Taking App",
    date: "TBD",
    description:
      "A minimalist note-taking app with features like real-time sync, rich text formatting, and cloud storage for notes, making it easy to organize and access them across devices.",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    imagePath: "/images/project4.png",
  },
];

const ProjectsTimeline = () => {
  const { theme } = useTheme();
  useGSAP(() => {
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });
  }, []);

  return (
    <section id="projects" className="section-padding md:px-20 px-5 mt-20">
      <TitleHeader title="My Projects" sub="💼 A Timeline of My Work" />
      <div className="relative mt-20">
        {/* Timeline Line */}
        <div className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />

        <div className="space-y-20 relative z-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="timeline-card flex items-stretch gap-10 pl-14 relative"
            >
              {/* Dot */}
              <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-white border-4 border-purple-500 z-20" />

              {/* Left Content */}
              <div className={`${theme === 'light' ? 'bg-[#abf7b1]' : 'bg-[#1e293b]'} p-6 rounded-2xl shadow-xl w-2/3`}>
                <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{project.title}</h2>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-white-50'} mt-1 mb-3`}>🗓️ {project.date}</p>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white-50'} mb-4`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs ${theme === 'light' ? 'bg-white text-blue-800' : 'bg-purple-800 text-white'} px-3 py-1 rounded-full`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="w-1/3 h-full flex items-center">
                <img 
                  src={project.imagePath}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover rounded-xl shadow-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsTimeline;
