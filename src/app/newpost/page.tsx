"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewPost, NewPostState } from "@/actions/newPostActions";
import { useFormState } from "react-dom";
import SubmitButton from "../../components/SubmitButton";
import { CloudUpload } from "lucide-react";
import styles from "./newpost.module.css";

const initialState: NewPostState = { message: null, errors: {} };

export default function NewPost() {
  const [state, formAction] = useFormState(createNewPost, initialState);

  return (
    <form
      className="flex lg:flex-row flex-col w-full max-w-[1024px] lg:w-[1024px] lg:mx-auto "
      action={formAction}
    >
      <div className="grow flex flex-wrap content-start lg:mr-4">
        <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 basis-full sm:pl-4 pl-2 sm:mt-0 mt-5">
          Add New Post
        </h3>
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input type="text" id="title" name="title" maxLength={255} />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.title &&
              state?.errors.title.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="price">
            Price <span className="text-red-500">*</span>
          </Label>
          <Input type="number" id="price" name="price" step={1} min={0} />
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.price &&
              state?.errors.price.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="address">
            Address <span className="text-red-500">*</span>
          </Label>
          <Input type="text" id="address" name="address" maxLength={255} />
          <div id="address-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.address &&
              state?.errors.address.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div id="new-post-inputs" className={styles.textAreaInputBlock}>
          <Label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            className="w-full"
            placeholder="Text description"
            id="description"
            name="description"
            rows={8}
            maxLength={1000}
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.description &&
              state?.errors.description.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="type">
            Type <span className="text-red-500">*</span>
          </Label>
          <Select defaultValue="rent" name="type">
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
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="property">
            Property <span className="text-red-500">*</span>
          </Label>
          <Select defaultValue="apartment" name="property">
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
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="city">
            City <span className="text-red-500">*</span>
          </Label>
          <Input type="text" id="city" name="city" maxLength={255} />
          <div id="city-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.city &&
              state?.errors.city.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="area">
            Total area <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            min={0}
            id="area"
            name="area"
            step={1}
            max={10000}
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
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="kitchen">
            Kitchen area <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            min={0}
            id="kitchen"
            name="kitchen"
            step={1}
            max={3000}
          />
          <div id="kitchen-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.kitchen &&
              state?.errors.kitchen.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="floor">
            Floor <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            min={0}
            id="floor"
            name="floor"
            step={1}
            max={2000}
          />
          <div id="floor-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.floor &&
              state?.errors.floor.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="year">
            Year of construction <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            min={0}
            id="year"
            name="year"
            step={1}
            max={3000}
          />
          <div id="year-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.year &&
              state?.errors.year.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="lat">Latitude</Label>
          <Input type="number" step="0.00000001" id="lat" name="lat" />
          <div id="lat-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.lat &&
              state?.errors.lat.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.newpostInputBlock}>
          <Label htmlFor="lon">Lontitude</Label>
          <Input type="number" step="0.00000001" id="lon" name="lon" />
          <div id="lon-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.lon &&
              state?.errors.lon.map((error: string) => (
                <p className="errorText" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.newpostInputBlock + ` mt-5`}>
          <SubmitButton size={"default"} content={"Add"} />
        </div>
      </div>
      <div
        id="new-post-files"
        className="lg:min-w-[400px] lg:mx-0 mx-2 min-h-[600px] lg:mt-0 mt-4 rounded-xl bg-gray-100 border bg-card text-card-foreground shadow grid p-8"
      >
        <h3 className="scroll-m-20 text-2xl tracking-tight ">Add Files</h3>
        <div className="place-self-center">
          <CloudUpload size={100} className="mb-4 mx-auto text-gray-500" />
          <p className="text-gray-500 font-semibold ">
            Place to add images. As for a tech demo images will be
            autogenerated. For a production project one should probably use some
            S3 server
          </p>
        </div>
      </div>
    </form>
  );
}
