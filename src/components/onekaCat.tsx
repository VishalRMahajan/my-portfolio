import Script from "next/script";
import React from "react";

export default function OnekoCat() {
  return <Script src="./oneko/oneko.js" data-cat="./oneko/oneko.gif" />;
}
