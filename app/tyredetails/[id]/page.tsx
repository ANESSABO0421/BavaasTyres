"use client";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const {id} = useParams() as { id: string };

  return <div>tyreDetails:{id}</div>;
};

export default page;
