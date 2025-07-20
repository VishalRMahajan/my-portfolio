import { useState } from "react";
import { Text } from "@/components/retroui/Text";
import { DATA } from "@/data";
import { Dialog } from "./retroui/Dialog";

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
  const [open, setOpen] = useState(false);

  return (
    <footer className="w-full mt-12 flex flex-col justify-center items-center py-4 font-mono text-sm sm:text-base tracking-wide select-none text-white px-2">
      <Text className="text-base text-white text-center">
        <span
          className="flex flex-wrap justify-center items-center gap-1.5 font-bold text-center"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          Made with
          <span
            className="text-red-600 text-xl"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            ♥
          </span>
          by
          <a
            href={DATA.footer.websiteUrl}
            className="underline underline-offset-2"
          >
            {DATA.footer.name}
          </a>
        </span>

        <span
          className="block text-xs mt-1 opacity-70 text-center break-all"
          style={{ textShadow: "1px 1px 0 #000" }}
        >
          Last updated: {lastUpdated}
        </span>

        <span
          className="block text-xs mt-2 underline cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Video Credits
        </span>
      </Text>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content
          size="sm"
          style={{
            background: "#23243a",
            border: "2px solid #22c55e",
            boxShadow: "6px 6px 0 #000",
            borderRadius: "0px",
            padding: "1rem",
          }}
        >
          <Text
            className="text-white text-sm text-center"
            style={{
              color: "#22c55e",
              textShadow: "1px 1px 0 #000",
            }}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: DATA.footer.VideoCredit,
              }}
            />
          </Text>
        </Dialog.Content>
      </Dialog>
    </footer>
  );
}
