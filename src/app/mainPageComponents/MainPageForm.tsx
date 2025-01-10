"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, FormEvent, memo, useCallback } from "react";
import { Input } from "../../components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PostType } from "@prisma/client";
import { Button } from "../../components/ui/button";
import CitiesComboBox, {
  ComboBoxValue,
} from "@/components/CitiesComboBox/CitiesComboBox";

const MemoizedComboBox = memo(CitiesComboBox);

const MainPageForm = () => {
  const router = useRouter();
  router.prefetch("/searchposts");
  const [tabValue, setTabValue] = useState<PostType>("sell");
  const [selectedCity, setSelectedCity] = useState<ComboBoxValue | null>(null);

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchParams = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      searchParams.append(key, value as string);
    }

    searchParams.append("type", tabValue);
    searchParams.append("city", selectedCity?.value ?? "");

    router.push(`/searchposts?${searchParams.toString()}`);
  }, []);

  // in next 15 this exact functionality is made with next js form component. This is next 14 bloated variant

  return (
    <>
      <Tabs
        className="md:w-[400px] pt-4"
        value={tabValue}
        onValueChange={(v) => setTabValue(v as PostType)}
      >
        <TabsList>
          <TabsTrigger className="h-10 rounded-md px-8" value="sell">
            Sell
          </TabsTrigger>
          <TabsTrigger className="h-10 rounded-md px-8" value="rent">
            Rent
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <form
        className="flex flex-row w-full items-center space-x-2 mt-4 flex-wrap gap-2"
        onSubmit={onSubmit}
      >
        <MemoizedComboBox
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <Input
          name="area"
          placeholder="m2"
          type="number"
          min="0"
          step={1}
          max={2000}
          className="w-[220px] !mx-0"
        />
        <Input
          name="minPrice"
          placeholder="Min Price"
          type="number"
          min="0"
          step={1}
          max={9999999}
          className="w-[220px] !mx-0 "
        />
        <Input
          name="maxPrice"
          placeholder="Max Price"
          type="number"
          min="0"
          step={1}
          max={9999999}
          className="w-[220px] !mx-0"
        />
        <Button size={"default"} type="submit" className="md:w-[auto] !mx-0 w-[220px]">
          <SearchIcon size={16} />
        </Button>
      </form>
    </>
  );
};

export default MainPageForm;

export const MainPageFormLoader = () => {
  return (
    <div className="mt-4">
      <div className="md:w-[400px] h-[40px] overflow-hidden rounded">
        <div className="moving-bar"> </div>
      </div>
      <div className="mt-4 md:w-[550px] h-[36px] overflow-hidden rounded">
        <div className="moving-bar"> </div>
      </div>
    </div>
  );
};
