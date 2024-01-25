import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), icon()],
  markdown: {
    remarkPlugins: [remarkToc, remarkBreaks]
  },
  site: "https://julienc.me"
});