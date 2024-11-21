import { Metadata } from "next";
import { projectData } from "../../lib/projectData";

export const metadata: Metadata = {
  title: "Projects | Jayden Richardson",
  description:
    "Web development projects showcasing various technologies and approaches",
  openGraph: {
    title: "Projects | Jayden Richardson",
    description:
      "Web development projects showcasing various technologies and approaches",
    images: projectData.slice(0, 6).map((project) => ({
      url: project.imgUrl,
      width: 1200,
      height: 630,
      alt: project.title,
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Jayden Richardson",
    description:
      "Web development projects showcasing various technologies and approaches",
    images: projectData[0].imgUrl,
  },
};
