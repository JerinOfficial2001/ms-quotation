import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  return <div className="p-10">{children}</div>;
}
