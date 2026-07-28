import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

function Box({ children, className }: BoxProps): React.ReactElement {
  return (
    <div
      className={twMerge("bg-neutral-900 rounded-md h-fill w-full", className)}
    >
      {children}
    </div>
  );
}

export default Box;
