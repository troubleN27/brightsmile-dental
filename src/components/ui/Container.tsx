import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 md:px-6", className)}
      {...props}
    />
  );
}
