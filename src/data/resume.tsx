import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Siddhant Singh",
  initials: "SS",
  url: "https://siddhant.site",
  location: "Dehradun, India",
  locationLink: "https://www.google.com/maps/place/Dehradun",
  description:
    "Technologist & Entrepreneur. Focused on GenAI and decentralized infrastructures. Operator & Builder.",
  summary:
    "I am a technologist at heart, a business operator by education, and an entrepreneur by consequence. I believe in the alchemy of data, design, and digital spaces. I passionately follow the consumer internet space and evolving technologies such as blockchain, computer vision, and natural language processing.",
  avatarUrl: "/sid.jpg",
  skills: [
    "GenAI",
    "Web3",
    "Strategy",
    "Product",
    "Python",
    "Next.js",
    "Typescript",
    "Blockchain",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "s@siddhant.site",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/sdntsng",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/singhsiddhant",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://twitter.com/sdntsng",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:s@siddhant.site",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Vinci",
      href: "https://tryvinci.com",
      badges: ["Founder"],
      location: "Remote",
      title: "Founder & CEO",
      logoUrl: "/vinci.gif",
      start: "2023",
      end: "Present",
      description:
        "Building an AI-powered platform that transforms prompts into high-quality videos, enabling creators and businesses to produce engaging content quickly and affordably.",
    },
    {
      company: "0xcel",
      href: "https://0xcel.xyz",
      badges: ["Founder"],
      location: "Remote",
      title: "Founder",
      logoUrl: "/0xcel.gif",
      start: "2022",
      end: "Present",
      description:
        "Architecting decentralized futures. We bridge the gap between blockchain innovation and real-world impact by adding strategic vision and flawless execution.",
    },
  ],
  education: [
    {
      school: "Siddhant's University",
      href: "#",
      degree: "Business Operator / Entrepreneurship",
      logoUrl: "",
      start: "",
      end: "",
    },
  ],
  projects: [
    {
      title: "Vinci",
      href: "https://tryvinci.com",
      dates: "2023 - Present",
      active: true,
      description:
        "Transforming prompts into cinematic video content. Enabling the next generation of visual storytellers via Generative AI.",
      technologies: [
        "Next.js",
        "Typescript",
        "GenAI",
        "Stable Diffusion",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://tryvinci.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/vinci.gif",
      video: "",
    },
    {
      title: "0xcel",
      href: "https://0xcel.xyz",
      dates: "2022 - Present",
      active: true,
      description:
        "Strategic vision for decentralized systems and Web3 marketing innovation.",
      technologies: [
        "Web3",
        "Blockchain",
        "Strategy",
        "Ethereum",
      ],
      links: [
        {
          type: "Website",
          href: "https://0xcel.xyz",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/0xcel.gif",
      video: "",
    },
  ],
  hackathons: [],
} as const;
