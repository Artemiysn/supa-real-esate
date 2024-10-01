'use client';

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const MainPageForm = () => {

  const [tabValue, setTabValue] = useState<"rent" | "buy">("rent");

  return (
    <Tabs
      className="w-[400px] pt-4"
      value={tabValue}
      onValueChange={(v) => setTabValue(v as "rent" | "buy")}
    >
      <TabsList>
        <TabsTrigger className="h-10 rounded-md px-8" value="rent">Rent</TabsTrigger>
        <TabsTrigger className="h-10 rounded-md px-8" value="buy">Buy</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default MainPageForm;
