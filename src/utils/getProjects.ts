import type { Project } from "../types/project";
import { getCollection } from "astro:content";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export async function getProjects(): Promise<Project[]> {
    const projects = await getCollection("portfolio");

    return projects
        .map((project) => {
            const {
                title,
                description,
                started,
                finished,
                image,
                project_url,
                stats,
            } = project.data;
            return {
                title,
                description,
                started,
                finished,
                image,
                project_url,
                stats,
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

            let bDate = dayjs(b.started, "DD-MM-YYYY").unix();
            if (b.finished) {
                bDate = dayjs(b.finished, "DD-MM-YYYY").unix();
            }
            let aDate = dayjs(a.started, "DD-MM-YYYY").unix();
            if (a.finished) {
                aDate = dayjs(a.finished, "DD-MM-YYYY").unix();
            }

            return bDate - aDate;
        });
}
