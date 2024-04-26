import { useMounted } from "@/hooks/use-mounted";
import { ReactNode, useEffect, useState } from "react";

interface MountedGuardProps {
  children: ReactNode;
}

export default function MountedGuard({ children }: MountedGuardProps) {
  const isMounted = useMounted();
  return isMounted() ? children : null;
}
