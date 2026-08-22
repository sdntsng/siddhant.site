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
      company: "Engram",
      href: "https://www.linkedin.com/company/110910576/",
      badges: [],
      location: "San Francisco Bay Area · Remote",
      title: "Co-Founder & CTO",
      logoUrl: "/engram.png",
      start: "Feb 2026",
      end: "Present",
      description:
        "GTM infra for AI-native companies. SOTA memory, context retrieval, agent skills, and multi-surface orchestration.",
    },
    {
      company: "Vinci",
      href: "https://tryvinci.com",
      badges: [],
      location: "San Francisco Bay Area",
      title: "Founder & CEO",
      logoUrl: "/vinci.png",
      start: "Aug 2024",
      end: "Present",
      description:
        "Building agentic rails to deliver production-ready creatives. Proprietary generative workflows for OOH, animation, and live-action. Scaled AI-native content biz to $1M ARR and AI-SaaS to $60K MRR.",
    },
    {
      company: "Early-Stage Startups",
      href: "https://www.flashy.cash",
      badges: [],
      location: "Remote",
      title: "Founding Member & Operator",
      logoUrl: "/memoji.png",
      start: "Apr 2015",
      end: "Present",
      description:
        "Founding member of web3 projects & funds (Ajna Capital, Flashy Cash, 0xcel, nicehire.in). Wrote on crypto and tech strategy for Hackernoon, Bitcoin99, and CoinPublish.",
    },
    {
      company: "Flipkart",
      href: "https://flipkart.com",
      badges: [],
      location: "Bengaluru, India",
      title: "Senior Manager - Product Marketing",
      logoUrl: "/flipkart.png",
      start: "Aug 2021",
      end: "Apr 2024",
      description:
        "Built MarTech systems and agentic AI pipelines. Co-authored the 'How India Shops Online' report with Bain & Company and helped group scale to $1B ARR.",
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
        "Product x tech x community. Drove new business initiatives under the India CEO; built and scaled the Red Cable Club loyalty program to 10M+ users.",
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
      title: "Engram",
      href: "https://www.linkedin.com/company/110910576/",
      active: true,
      description:
        "GTM infra for AI-native companies. SOTA memory, context retrieval, agent skills, and multi-surface orchestration.",
      technologies: [
        "Hypergraphs",
        "Context Retrieval",
        "Agent Skills",
        "LLMs",
        "Vector Search",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.linkedin.com/company/110910576/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/engram.png",
      video: "",
    },
    {
      title: "Vinci",
      href: "https://tryvinci.com",
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
      title: "OpenOutreach",
      href: "https://github.com/sdntsng/openoutreach",
      active: true,
      description:
        "Self-hosted, agent-first cold outreach engine. cold-cli daemon, Gmail OAuth, background scheduling, and unified MCP tools.",
      technologies: [
        "Go",
        "Cloudflare Workers",
        "Gmail API",
        "MCP",
        "PostgreSQL",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/sdntsng/openoutreach",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/openmool-cover.png",
      video: "",
    },
    {
      title: "Sutrana",
      href: "https://github.com/sdntsng/sutrana",
      active: true,
      description:
        "Local-first ambient memory for macOS: ScreenCaptureKit OCR, on-device SQLite FTS5, and MCP server for Claude/Cursor.",
      technologies: [
        "Swift",
        "macOS",
        "Local AI",
        "MCP",
        "SQLite FTS5",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/sdntsng/sutrana",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/sheety-cover.png",
      video: "",
    },
    {
      title: "Open Mool",
      href: "https://openmool.org",
      active: true,
      description:
        "Public infra for preserving cultural heritage. Capturing, coding, and immortalizing Himalayan culture.",
      technologies: [
        "Next.js",
        "Cloudflare Workers",
        "D1",
        "R2",
        "Workers AI",
        "Typescript",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://openmool.org",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/open-mool/open-mool",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/openmool-cover.png",
      video: "",
    },
    {
      title: "Sheety CRM",
      href: "https://sheety.site/",
      active: true,
      description:
        "A stateless, open-source CRM built on Google Sheets. Own your data, no vendor lock-in.",
      technologies: [
        "Next.js",
        "FastAPI",
        "Google Sheets API",
        "Typescript",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://sheety.site/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/sdntsng/sheety-crm",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/sheety-cover.png",
      video: "",
    },
  ],
  hackathons: [],
} as const;
