/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://vishalrmahajan.in",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: "monthly",
  priority: 0.7,
  exclude: ["/404"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://vishalrmahajan.in/sitemap.xml",
      "https://vishalrmahajan.in/image-sitemap.xml",
    ],
  },
};
