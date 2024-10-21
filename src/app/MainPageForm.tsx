"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, FormEvent } from "react";
import { Input } from "../components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PostType } from "@prisma/client";
import { Button } from "../components/ui/button";

const MainPageForm = () => {
  const router = useRouter();
  router.prefetch("/searchposts");
  const [tabValue, setTabValue] = useState<PostType>("rent");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchParams = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      searchParams.append(key, value as string);
    }

    searchParams.append("type", tabValue);

    router.push(`/searchposts?${searchParams.toString()}`);
  }

  return (
    <>
      <Tabs
        className="w-[400px] pt-4"
        value={tabValue}
        onValueChange={(v) => setTabValue(v as PostType)}
      >
        <TabsList>
          <TabsTrigger className="h-10 rounded-md px-8" value="rent">
            Rent
          </TabsTrigger>
          <TabsTrigger className="h-10 rounded-md px-8" value="sell">
            Sell
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <form
        className="flex flex-row w-full items-center space-x-2 mt-4"
        onSubmit={onSubmit}
      >
        <Input name="city" placeholder="City" type="text" maxLength={200} />
        <Input
          name="area"
          placeholder="m2"
          type="number"
          min="0"
          step={1}
          max={2000}
        />
        <Input
          name="minPrice"
          placeholder="Min Price"
          type="number"
          min="0"
          step={1}
        />
        <Input
          name="maxPrice"
          placeholder="Max Price"
          type="number"
          min="0"
          step={1}
        />
        <Button size={"default"} type="submit">
          <SearchIcon size={16} />
        </Button>
      </form>
    </>
  );
};

export default MainPageForm;
