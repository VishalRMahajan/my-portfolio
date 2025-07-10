function getLastUpdatedString() {
  const ts = process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_TIME;

  if (ts && !isNaN(Number(ts))) {
    return new Date(Number(ts)).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
  return "N/A";
}

export default function Footer() {
  const lastUpdated = getLastUpdatedString();

  return (
    <footer className="w-full mt-12 flex flex-col justify-center items-center py-4 font-mono text-sm sm:text-base tracking-wide select-none text-white px-2">
      <span
        className="flex flex-wrap items-center gap-1.5 font-bold text-center"
        style={{ textShadow: "2px 2px 0 #000" }}
      >
        Made with
        <span
          className="text-red-600 text-xl"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          ♥
        </span>
        <a
          href="https://vishalrmahajan.in"
          className="underline underline-offset-2"
        >
          by Vishal Rajesh Mahajan
        </a>
      </span>
      <span
        className="text-xs mt-1 opacity-70 text-center break-all"
        style={{ textShadow: "1px 1px 0 #000" }}
      >
        Last updated: {lastUpdated}
      </span>
    </footer>
  );
}
