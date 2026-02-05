import type { Metadata } from "next";
import "../studio.css";

export const metadata: Metadata = {
  title: "Sanity Studio — interieur.expert",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
