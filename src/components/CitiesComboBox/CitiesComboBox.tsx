"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TailSpin } from "react-loader-spinner";
import { fetchUniqueCities } from "@/actions/actions";

export type ComboBoxValue = { value: string; label: string };

type CitiesComboBoxProps = {
  selectedCity: ComboBoxValue | null;
  setSelectedCity: Dispatch<SetStateAction<ComboBoxValue | null>>;
};

const CitiesComboBox: React.FC<CitiesComboBoxProps> = ({
  selectedCity,
  setSelectedCity
}) => {

  const [citiesLoading, setCitiesLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  
  const [uniqueCities, setUniqueCities] = useState<
    { value: string; label: string }[]
  >([]);
  
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchCitiesInitially = async () => {
      setCitiesLoading(true);
      try {
        const cities = await fetchUniqueCities();
        setUniqueCities(cities);
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCitiesInitially();

    const refetchData = async () => {
      const cities = await fetchUniqueCities();
      setUniqueCities(prev=>cities);
    }

    const intervalId = setInterval(refetchData, 5 * 60 * 1000); // every 5 minutes refetch cities list
    return () => clearInterval(intervalId);

  }, []);
  

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[200px] min-w-[200px] justify-start bg-transparent"
            disabled={citiesLoading}
          >
            {citiesLoading ? (
             <><TailSpin width={20} height={20} color="black" /><span className="inline-block ml-2">Loading cities...</span> </>
            ) : selectedCity ? (
              <span className="capitalize">{selectedCity.label}</span>
            ) : (
              <>Select city</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <CititesList
            setOpen={setOpen}
            setSelectedCity={setSelectedCity}
            cities={uniqueCities}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {selectedCity ? <>{<span className="capitalize">{selectedCity.label}</span>}</> : <>Select city</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CititesList
            setOpen={setOpen}
            setSelectedCity={setSelectedCity}
            cities={uniqueCities}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CitiesComboBox;

function CititesList({
  setOpen,
  setSelectedCity,
  cities,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCity: (city: ComboBoxValue | null) => void;
  cities: ComboBoxValue[];
}) {
  return (
    <Command>
      <CommandInput placeholder="Search City..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {cities.map((city) => (
            <CommandItem
              key={city.value}
              value={city.value}
              onSelect={(value) => {
                setSelectedCity(
                  cities.find((priority) => priority.value === value) || null
                );
                setOpen(false);
              }}
            >
              <span className="capitalize">{city.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
