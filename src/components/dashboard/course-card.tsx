import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProgressRing } from "./progress-ring";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Link from "next/link";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  image?: string;
  lastLesson?: string;
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

export function CourseCard({
  id,
  title,
  description,
  progress,
  image,
  lastLesson,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={
            image ||
            `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(
              title
            )}`
          }
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 left-3 z-20">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
            {lastLesson && (
              <p className="text-xs mt-2 text-muted-foreground">
                Last: {lastLesson}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 relative">
            <ProgressRing progress={progress} />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
              {progress}%
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/dashboard/courses/${id}`} className="w-full">
          <Button variant="default" className="w-full">
            {progress > 0 ? "Continue Learning" : "Start Course"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
