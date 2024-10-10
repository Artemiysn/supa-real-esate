"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useActionState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";


const MainPageForm = () => {

  const [tabValue, setTabValue] = useState<"rent" | "buy">("rent");
  // второй аргумент - это начальное состояние формы
  // const [data, searchEstateAction, isPending] = useActionState(
  //   searchEstateFunc,
  //   undefined
  // );

  return (
    <>
      <Tabs
        className="w-[400px] pt-4"
        value={tabValue}
        // попробовать передать напрямую в форму
        onValueChange={(v) => setTabValue(v as "rent" | "buy")}
      >
        <TabsList>
          <TabsTrigger className="h-10 rounded-md px-8" value="rent">
            Rent
          </TabsTrigger>
          <TabsTrigger className="h-10 rounded-md px-8" value="buy">
            Buy
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <form
        // action={searchEstateAction} можно байндом добавить вкладку!
        className="flex flex-row w-full items-center space-x-2 mt-4"
      >
        <Input name="city" placeholder="City" type="text"/>
        <Input name="area" placeholder="m3" type="number" min="0" step={1}/>
        <Input name="minPrice" placeholder="Min Price" type="number" min="0" step={1}/>
        <Input name="maxPrice" placeholder="Max Price" type="number" min="0" step={1}/>
        <Button><SearchIcon size={16} /></Button>
      </form>
    </>
  );
};

export default MainPageForm;
