import type { SVGProps } from "react";

export function IndustryIc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.2}
      >
        <path d="M.65 11.694v-3.62l3.167-1.357l3.167 1.358v3.619L3.817 13.05z"></path>
        <path d="m.65 8.067l3.167 1.357l3.167-1.357M3.817 3.122L6.983 4.48l3.167-1.357"></path>
        <path d="m6.983 8.067l3.167 1.357l3.167-1.357"></path>
        <path d="M3.819 6.715v-3.62l3.166-1.357l3.167 1.357v3.62L6.985 8.072zm3.164 4.979v-3.62l3.167-1.357l3.167 1.358v3.619L10.15 13.05zM3.817 9.426v3.625m6.335-3.625v3.625M6.983 4.48v3.624"></path>
      </g>
    </svg>
  );
}
