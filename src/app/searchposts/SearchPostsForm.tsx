"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { searchPosts, searchPostState } from "@/actions";
import { useFormState } from "react-dom";

type SearchPostsProps = {
  searchParams: { [key: string]: string | undefined };
};

const initialState: searchPostState = { message: null, errors: {} };

const SearchPostsForm: React.FC<SearchPostsProps> = ({ searchParams }) => {
  const [state, formAction] = useFormState(searchPosts, initialState);

  return (
    <form
      className="flex flex-row w-auto flex-wrap content-start my-4 items-baseline ml-8 "
      action={formAction}
    >
      <div id="city-input-block" className="searchInputBlock w-52">
        <Label htmlFor="city">City</Label>
        <Input
          name="city"
          placeholder="City"
          type="text"
          defaultValue={searchParams?.city}
          maxLength={255}
        />
        <div id="city-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.city &&
            state?.errors.city.map((error: string) => (
              <p className="errorText" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div id="type-select-block" className="searchInputBlock w-24">
        <Label htmlFor="type">Type</Label>
        <Select name="type" defaultValue={searchParams?.type}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="sell">Sell</SelectItem>
          </SelectContent>
        </Select>
        <div id="type-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.type &&
            state?.errors.type.map((error: string) => (
              <p className="errorText" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="searchInputBlock w-36">
        <Label htmlFor="property">Property</Label>
        <Select defaultValue={undefined} name="property">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
          </SelectContent>
        </Select>
        <div id="property-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.property &&
            state?.errors.property.map((error: string) => (
              <p className="errorText" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="searchInputBlock w-36">
        <Label htmlFor="minPrice">Min Price</Label>
        <Input
          type="number"
          id="minPrice"
          name="minPrice"
          step={1}
          min={0}
          defaultValue={searchParams?.minPrice}
        />
        <div id="min-price-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.minPrice &&
            state?.errors.minPrice.map((error: string) => (
              <p className="errorText" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="searchInputBlock w-36">
        <Label htmlFor="maxPrice">Max Price</Label>
        <Input
          type="number"
          id="maxPrice"
          name="maxPrice"
          step={1}
          min={0}
          defaultValue={searchParams?.maxPrice}
        />
        <div id="max-price-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.maxPrice &&
            state?.errors.maxPrice.map((error: string) => (
              <p className="errorText" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="searchInputBlock w-36">
        <Label htmlFor="area">Total area</Label>
        <Input
          type="number"
          min={0}
          id="area"
          name="area"
          step={1}
          defaultValue={searchParams?.area}
        />
        <div id="area-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.area &&
            state?.errors.area.map((error: string) => (
              <p className="errorText" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="relative">
        <Button size={"default"} type="submit" className="absolute top-[7px]">
          <SearchIcon size={16} />
        </Button>
      </div>
    </form>
  );
};

export default SearchPostsForm;
