"use client";
import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PageAdminEmail = () => {
  const { data } = useQuery({
    queryKey: ["email-preview"],
    queryFn: () => {
      return fetch("/api/mail?type=newsletter").then((res) => res.text());
    },
  });

  console.log({ data });
  return (
    <div className="email-preview-container">
      <div className="email-preview-header">
        <h2>Prévisualisation Email</h2>
      </div>
      <div className="email-preview-content">
        <iframe
          srcDoc={data}
          style={{
            width: "100%",
            height: "600px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
};

export default PageAdminEmail;
