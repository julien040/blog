import type { Project } from "../types/project";
import { getCollection } from "astro:content";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection("portfolio");

  return projects
    .map((project) => {
      const { title, description, started, finished, image, project_url } =
        project.data;
      return {
        title,
        description,
        started,
        finished,
        image,
        project_url,
        url: "/portfolio/" + project.slug,
      };
    })
    .sort((a, b) => {
      // If the project is not finished, it will be placed at the top of the list
      if (b.finished === undefined) {
        return Infinity;
      } else if (a.finished === undefined) {
        return -Infinity;
      }
      return (
        dayjs(b.started, "DD-MM-YYYY").unix() -
        dayjs(a.started, "DD-MM-YYYY").unix()
      );
    });
}
