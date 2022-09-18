import { ReactNode } from "react";

const textSizes = {
  xs: "10px",
  sm: "12px",
  md: "16px",
  lg: "18px",
  xl: "22px",
  xxl: "24px",
};

interface TextProps {
  size?: keyof typeof textSizes;
  children: ReactNode;
  className?: string;
}

export function Text({ size, children, className }: TextProps) {
  const styles = { fontSize: size ? textSizes[size] : textSizes["md"] };
  let classNames = `text ${className ? className : ""}`;
  return (
    <p className={classNames} style={styles}>
      {children}
    </p>
  );
}
