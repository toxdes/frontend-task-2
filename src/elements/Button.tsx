import { ComponentPropsWithoutRef } from "react";
import {
  IoBookmarkOutline,
  IoChatbubbleOutline,
  IoHeart,
  IoHeartOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";
import "./Button.style.css";
type TButtonType = "primary" | "outline" | "ghost";

interface ButtonBaseProps {
  onClick: () => void;
  containerProps?: ComponentPropsWithoutRef<"button">;
}

interface ButtonProps extends ButtonBaseProps {
  value: string;
  type: TButtonType;
  className?: string;
}

export function Button({
  onClick,
  value,
  type,
  containerProps,
  className,
}: ButtonProps) {
  if (type === "primary") {
    return (
      <button
        className={`primary-button ${className}`}
        onClick={onClick}
        {...containerProps}
        type="button"
      >
        {value}
      </button>
    );
  }

  if (type === "ghost") {
    return (
      <button
        className={`ghost-button ${className}`}
        onClick={onClick}
        {...containerProps}
        type="button"
      >
        {value}
      </button>
    );
  }

  if (type === "outline") {
    return (
      <button
        className={`outline-button ${className}`}
        onClick={onClick}
        {...containerProps}
        type="button"
      >
        {value}
      </button>
    );
  }
  return null;
}

type TIconButtonType = "like" | "like-fill" | "share" | "comment" | "bookmark";

interface IconButtonProps extends ButtonBaseProps {
  type: TIconButtonType;
  className?: string;
}

export function IconButton({ onClick, type, className }: IconButtonProps) {
  return (
    <div className={`icon-button ${className}`} onClick={onClick}>
      {type === "like" && <IoHeartOutline size="40px" />}
      {type === "like-fill" && <IoHeart size="40px" color="tomato" />}
      {type === "comment" && <IoChatbubbleOutline size="40px" />}
      {type === "share" && <IoPaperPlaneOutline size="40px" />}
      {type === "bookmark" && <IoBookmarkOutline size="40px" />}
    </div>
  );
}
