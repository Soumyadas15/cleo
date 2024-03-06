"use client";

import { Badge } from "@/components/ui/badge";
import { useSocket } from "@/providers/SocketProvider";

export const ConnectionIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge 
        variant="outline" 
        className="bg-yellow-600 text-white border-none"
      >
        Socket disconnected
      </Badge>
    )
  }

  return (
    <Badge 
      variant="outline" 
      className="bg-emerald-600 text-white border-none"
    >
      Socket connected
    </Badge>
  )
}