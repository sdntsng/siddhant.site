import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Siddhant Singh",
  initials: "SS",
  url: "https://siddhant.site",
  location: "Dehradun, India",
  locationLink: "https://www.google.com/maps/place/Dehradun",
  description:
    "Technologist & Entrepreneur",
  summary:
    "I'm a technologist, business operator, and entrepreneur. \n\n I follow the consumer internet space and evolving technologies such as blockchain and machine learning. I write on my [blog](/blog) about tech, startups, and lifestyle, and in my downtime, produce [music](/music).",
  avatarUrl: "/sid.jpg",
  altAvatarUrl: "/sid-alt.png",
  Interests: [
    "generative ai",
    "web3",
    "strategy",
    "product",
    "blockchain",
    "machine learning",
    "consumer internet",
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
        url: "https://x.com/sdntsng",
        icon: Icons.x,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/founder.vs.market",
        icon: Icons.instagram,
        navbar: true,
      },
      WhatsApp: {
        name: "WhatsApp",
        url: "https://wa.me/919522565616",
        icon: Icons.whatsapp,
        navbar: false,
      },
      Resume: {
        name: "Resume",
        url: "/resume",
        icon: Icons.googleDrive,
        navbar: false,
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
      badges: [],
      location: "San Francisco Bay Area",
      title: "Founder & CEO",
      logoUrl: "/vinci.png",
      start: "May 2024",
      end: "Present",
      description:
        "Building AI agents for brands. Streamlining creative workflows with context, taste, and GenAI infrastructure.",
    },
    {
      company: "Startups",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Founding Member",
      logoUrl: "/memoji.png", // Using memoji or generic icon for various startups
      start: "Apr 2015",
      end: "Present",
      description:
        "Co-founded web3 projects like Ajna Capital and Flashy Cash. Wrote on crypto strategy for Hackernoon and Bitcoin99.",
    },
    {
      company: "Flipkart",
      href: "https://flipkart.com",
      badges: [],
      location: "Bengaluru, India",
      title: "Senior Manager - Product Marketing",
      logoUrl: "/flipkart.png",
      start: "Feb 2023",
      end: "Apr 2024",
      description:
        "Scaled B2B revenue to $1B ARR. Led GTM strategy and co-authored the 'How India Shops Online' report with Bain.",
    },
    {
      company: "OnePlus",
      href: "https://oneplus.in",
      badges: [],
      location: "India",
      title: "India Strategy Team",
      logoUrl: "/oneplus.png",
      start: "Jul 2020",
      end: "Aug 2021",
      description:
        "Launched the Red Cable Club loyalty program. Scaled to 10M+ users.",
    },
  ],
  education: [
    {
      school: "Indian Institute of Management, Indore",
      href: "https://www.iimidr.ac.in/",
      degree: "MBA",
      logoUrl: "/iim.png",
      start: "2018",
      end: "2020",
    },
    {
      school: "Indian Institute of Management, Indore",
      href: "https://www.iimidr.ac.in/",
      degree: "Bachelor's Degree",
      logoUrl: "/iim.png",
      start: "2015",
      end: "2018",
    },
  ],
  projects: [
    {
      title: "Vinci",
      href: "https://tryvinci.com",
      dates: "2024 - Present",
      active: true,
      description:
        "AI agents for brands. Context-aware creative generation for marketing teams.",
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
      title: "Artimech",
      href: "https://artimech.com",
      dates: "2023 - Present",
      active: true,
      description:
        "Intelligent engineering studio. We build AI/ML systems that work. Clean, efficient, and purpose-built for modern problems.",
      technologies: [
        "AI Strategy",
        "MLOps",
        "LLMs",
        "Data Engineering",
        "Agentic Systems",
      ],
      links: [
        {
          type: "Website",
          href: "https://artimech.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/artimech.png",
      video: "",
    },
  ],
  hackathons: [],
} as const;
