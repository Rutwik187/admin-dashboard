import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Aamchi Mumbai",
  version: packageJson.version,
  copyright: `© ${currentYear}, Aamchi Mumbai.`,
  meta: {
    title: "Aamchi Mumbai - Bakery Management Dashboard",
    description:
      "Aamchi Mumbai is a comprehensive bakery management system for inventory, supply chain, and operations management. Built with Next.js 16, Tailwind CSS v4, and shadcn/ui.",
  },
};
