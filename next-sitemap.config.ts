/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://vishalrmahajan.in",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://vishalrmahajan.in/sitemap.xml"],
  },
};
