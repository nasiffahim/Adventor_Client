import React from "react";
import {
  User,
  Code,
  Github,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Heart,
} from "lucide-react";
import Navbar from "../../Components/Navbar/Navbar";

export default function AboutDev() {
  const developerInfo = {
    name: "Nasif Wasek Fahim",
    title: "Junior Full Stack Developer",
    location: "Dhaka, Bangladesh",
    experience: "2+ Years",
    email: "nasif.wasek@gmail.com",
    bio: "Passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions that solve real-world problems and deliver exceptional user experiences.",
    skills: [
      "React",
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "SpringBoot",
    ],
    projects: [
      {
        name: "AssignMint",
        description:
          "A online group study portal created with React frontend and Node.js backend",
        tech: ["React", "Node.js", "MongoDB", "Tailwind", "DaisyUI"],
        link: "https://online-group-study-509ea.web.app/",
        status: "Live",
      },
      {
        name: "Recipe Book",
        description:
          "A collaborative recipe sharing online platform for sharing recipe and learn new things",
        tech: ["Recat", "Express.js", "Firebase", "Tailwind", "Node.js"],
        link: "https://recipe-book-94497.web.app/",
        status: "Live",
      },
      {
        name: "Subscription Mart",
        description:
          "A subscription based online platform for developers and gamers to buy stuffs",
        tech: ["React", "Node.js", "MongoDB", "Tailwind", "DaisyUI"],
        link: "https://subscription-mart.web.app/",
        status: "Live",
      },
    ],
    socialLinks: [
      { name: "GitHub", url: "https://github.com/nasiffahim", icon: Github },
      {
        name: "Portfolio",
        url: "https://denofnasifdev.vercel.app/",
        icon: ExternalLink,
      },
      { name: "Email", url: "mailto:nasif.wasek@gmail.com", icon: Mail },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Development":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div>
      <div className="override-navbar w-10/12 mx-auto">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {developerInfo.name}
                </h1>
                <p className="text-xl text-indigo-600 font-medium">
                  {developerInfo.title}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <span>{developerInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>{developerInfo.experience}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-indigo-500" />
                <span>{developerInfo.email}</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{developerInfo.bio}</p>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Code className="w-6 h-6 text-indigo-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                Technical Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {developerInfo.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-medium border border-indigo-200 hover:shadow-md transition-shadow"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Briefcase className="w-6 h-6 text-indigo-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                Featured Projects
              </h2>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {developerInfo.projects.length} Projects
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developerInfo.projects.map((project, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Project</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-6 h-6 text-indigo-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                Connect With Me
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              {developerInfo.socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
