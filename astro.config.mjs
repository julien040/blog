import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkToc from 'remark-toc'
import remarkBreaks from "remark-breaks";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  markdown: {
    remarkPlugins: [remarkToc, remarkBreaks],
  },
});
