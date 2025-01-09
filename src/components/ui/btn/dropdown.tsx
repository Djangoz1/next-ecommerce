"use client";
import React, { useState } from "react";

export const Dropdown = ({
  arr,
}: {
  arr: { title: string; value?: string }[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <select
      className="w-fit font-info px-2 py-3 border rounded-sm   pr-10 bg-transparent border-gray-400"
      name="Testyons"
      id=""
    >
      {/* placeholder */}

      {arr.map((el, i) => (
        <option className="p-10" value={el.value || i}>
          {el.title}
        </option>
      ))}
    </select>
  );
};
