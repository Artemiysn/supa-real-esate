import { Textarea } from "@/components/ui/textarea";
import Unauthorized from "@/components/Unauthorized/Unauthorized";
import styles from "./newpost.module.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewPost, NewPostState } from "@/actions";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import SubmitButton from "../../components/SubmitButton";

const initialState: NewPostState = { message: null, errors: {} };

const NewPost = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") return <Unauthorized />;

  const [state, formAction] = useFormState(createNewPost, initialState);

  return (
    <form className="flex w-full" action={formAction}>
      <div className="grow flex flex-wrap content-start ml-4">
        <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 basis-full pl-4">
          Add New Post
        </h3>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" name="title" />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.title &&
              state?.errors.title.map((error: string) => (
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="price">Price</Label>
          <Input type="number" id="price" name="price" step={0.1} />
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.price &&
              state?.errors.price.map((error: string) => (
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="address">Address</Label>
          <Input type="text" id="address" name="address" />
          <div id="address-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.address &&
              state?.errors.address.map((error: string) => (
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div id="new-post-inputs" className={styles.inputBlock + ` basis-full`}>
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="w-full"
            placeholder="Text description"
            id="description"
            name="description"
            rows={8}
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.description &&
              state?.errors.description.map((error: string) => (
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="type">Type</Label>
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
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="property">Property</Label>
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
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" name="city" />
          <div id="city-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.city &&
              state?.errors.city.map((error: string) => (
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="area">Total area</Label>
          <Input type="number" min="0" id="area" name="area" step={1} />
          <div id="area-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.area &&
              state?.errors.area.map((error: string) => (
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="kitchen">Kitchen area</Label>
          <Input type="number" min="0" id="kitchen" name="kitchen" step={1} />
          <div id="kitchen-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.kitchen &&
              state?.errors.kitchen.map((error: string) => (
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="floor">Floor</Label>
          <Input type="number" min="0" id="floor" name="floor" step={1} />
          <div id="floor-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.floor &&
              state?.errors.floor.map((error: string) => (
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="year">Year of construction</Label>
          <Input type="number" min="0" id="year" name="year" step={1} />
          <div id="year-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.year &&
              state?.errors.year.map((error: string) => (
                <p className={styles.errorText} key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.inputBlock + ` basis-1/3  mt-5`}>
          <SubmitButton size={'default'} content={"Add"}/>
        </div>
      </div>
      <div
        id="new-post-files"
        className="min-w-[400px] mr-8 bg-orange-50 min-h-[600px] rounded"
      >
        Add images
      </div>
    </form>
  );
};

export default NewPost;
