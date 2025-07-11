export const DATA = {
  contact: {
    name: "Vishal Mahajan",
    social: {
      GitHub: "https://github.com/VishalRMahajan",
      LinkedIn: "https://linkedin.com/in/VishalRMahajan",
      X: "https://twitter.com/VishalRMahajan",
      Email: "mailto:06vism@gmail.com",
      LeetCode: "https://leetcode.com/VishalRMahajan/",
      Resume: "https://resume.vishalrmahajan.in",
    },
  },
  skills: [
    "nodejs",
    "express",
    "fastapi",
    "flask",
    "python",
    "javascript",
    "cpp",
    "postgres",
    "mysql",
    "mongo",
    "react",
    "tailwindcss",
    "git",
    "postman",
    "sklearn",
  ],
  work: [
    {
      company: "The Good Game Theory",
      href: "https://www.thegoodgametheory.com/",
      Skills: ["NodeJs", "Express"],
      location: "Remote",
      title: "Backend Developer Intern",
      logoUrl: "/work-logo/tggt.png",
      start: "May 2025",
      end: "Present",
      description: "Joined Just Now, Will update soon.",
    },
  ],
  projects: [
    {
      description: "AI-Powered Accident Detection System",
      title: "Nirikshan",
      videosrc: "",
      githubLink: "https://github.com/VishalRMahajan/Nirikshan",
      deployed: false,
      deployedlink: "",
      content: [
        "Built a real-time accident detection system using YOLOv11 integrated with a FastAPI WebSocket server to stream CCTV-based alerts to a live dashboard.",
        "Achieved over 90% accuracy across mAP, precision, and recall by applying advanced data augmentation and hyperparameter tuning.",
        "Designed a full-stack monitoring platform with a 3-stage incident workflow (Verify → Ongoing → Resolved), enabling real-time coordination between dashboard operators and field responders using PostgreSQL, WebSockets, and FastAPI.",
      ],
    },
    {
      description: "Just run npx vishalrmahajan and see it in action",
      title: "NPX VishalRMahajan",
      videosrc: "https://youtu.be/aqoyMsZe2K0",
      githubLink: "https://github.com/VishalRMahajan/npx-vishalrmahajan",
      deployed: false,
      deployedlink: "",
      content: [
        "Created a one-command interactive portfolio that runs entirely in the terminal using the npx package runner.",
        "Designed a colorful, keyboard-navigable CLI interface, offering a unique way to browse my projects, experience, and contact info.",
        "Built with modern terminal libraries like chalk for colors, cfonts for ASCII art, and terminal-kit for interactive elements.",
        "Features real-time navigation, command interface inside it, and a seamless user experience right from the command line.",
      ],
    },
    {
      description: "MERN-Based Food Ordering Platform",
      title: "Nivala",
      videosrc: "https://youtu.be/3Axl_S_9uqA",
      githubLink: "https://github.com/VishalRMahajan/Nivala",
      deployed: true,
      deployedlink: "https://nivala.vishalrmahajan.in",
      content: [
        "Developed a complete food ordering platform with a customer-facing site, an admin dashboard, and a backend API using a 3-tier microservices architecture.",
        "Implemented JWT authentication, Role-Based Access Control (RBAC), and a structured order management system for secure and scalable user handling.",
        "Built a responsive SPA using React, React Router, and modular components, with mobile-first design.",
        "Developed backend features like password hashing (bcrypt), shopping cart persistence, promo code validation, and middleware-secured API endpoints with full CORS support.",
      ],
    },
  ],
} as const;
