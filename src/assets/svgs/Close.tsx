import React from "react";

type Props = {};

export default function Close({}: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      color="var(--color-primary-500)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645C4.45118 4.84171 4.45118 5.15829 4.64645 5.35355L5.35355 4.64645ZM18.6464 19.3536C18.8417 19.5488 19.1583 19.5488 19.3536 19.3536C19.5488 19.1583 19.5488 18.8417 19.3536 18.6464L18.6464 19.3536ZM4.64645 5.35355L18.6464 19.3536L19.3536 18.6464L5.35355 4.64645L4.64645 5.35355Z"></path>
      <path d="M19.3536 5.35355C19.5488 5.15829 19.5488 4.84171 19.3536 4.64645C19.1583 4.45118 18.8417 4.45118 18.6464 4.64645L19.3536 5.35355ZM4.64645 18.6464C4.45118 18.8417 4.45118 19.1583 4.64645 19.3536C4.84171 19.5488 5.15829 19.5488 5.35355 19.3536L4.64645 18.6464ZM18.6464 4.64645L4.64645 18.6464L5.35355 19.3536L19.3536 5.35355L18.6464 4.64645Z"></path>
    </svg>
  );
}
