import { ChangeEventHandler, FormEventHandler, forwardRef } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});
