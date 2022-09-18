import { useState } from "react";

export function useLoader() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const set = (v: boolean) => setIsLoading(v);
  return { isLoading, set };
}
