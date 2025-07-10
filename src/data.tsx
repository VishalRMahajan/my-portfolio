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
      badges: [],
      location: "Remote",
      title: "Backend Developer Intern",
      logoUrl:
        "https://cdn.prod.website-files.com/676c6d974fac45287620a12f/67a92a9cc9f7303823927011_Borcelle__4_-removebg%20(1).png",
      start: "May 2025",
      end: "Present",
      description: "Joined Just Now, Will update soon.",
    },
  ],
  projects: [
    {
      description: "AI-Powered Accident Detection System",
      title: "Nirikshan",
      src: "https://github.com/user-attachments/assets/1e7ceab6-443b-488d-af8f-ed17ec77cce0",
      videosrc: "",
      githubLink: "https://github.com/VishalRMahajan/Nirikshan",
      deployed: false,
      deployedlink: "",

      content: () => {
        return (
          <p>
            Built an AI-driven system using YOLOv11 to detect vehicle collisions
            in real-time from CCTV footage, achieving 99% mAP@50. Integrated
            instant WebSocket alerts and a dashboard for incident tracking and
            emergency response coordination.
          </p>
        );
      },
    },
    {
      description: "Just run npx vishalrmahajan and see it in action",
      title: "NPX VishalRMahajan",
      src: "/npx-vishalrmahajan.png",
      videosrc: "https://youtu.be/aqoyMsZe2K0",
      githubLink: "https://github.com/VishalRMahajan/npx-vishalrmahajan",
      deployed: false,
      deployedlink: "",
      content: () => {
        return (
          <p>
            npx vishalrmahajan is a one-command, interactive portfolio that runs
            entirely in your terminal. Launching it with npx instantly opens a
            colorful, ASCII-styled UI where you can browse my portfolio through
            typed commands or keyboard navigation
          </p>
        );
      },
    },
    {
      description: "MERN-Based Food Ordering Platform",
      title: "Nivala",
      src: "/nivala.png",
      videosrc: "https://youtu.be/3Axl_S_9uqA",
      githubLink: "https://github.com/VishalRMahajan/Nivala",
      deployed: true,
      deployedlink: "https://nivala.vishalrmahajan.com",
      content: () => {
        return (
          <p>
            Architected a complete MERN stack solution featuring a
            customer-facing food ordering portal and an admin dashboard for
            real-time management of food items, orders, and user data.
            Integrated JWT-based authentication for secure user sessions and
            implemented RESTful APIs for seamless data management, optimizing
            frontend API calls to enhance load times and create a more
            responsive user experience.
          </p>
        );
      },
    },
  ],
} as const;
