import { getServerAuthSession } from "@/auth";
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
import { Button } from "@/components/ui/button";

const NewPost = async () => {
  // with jwt set up this should be in middleware
  const session = await getServerAuthSession();
  if (!session) return <Unauthorized />;

  // чтобы передать юзера используй bind
  //addToCart.bind(product.id)

  return (
    <form className="flex w-full">
      <div className="grow flex flex-wrap content-start ml-4">
        <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 basis-full pl-4">
          Add New Post
        </h3>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" name="title" />
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="price">Price</Label>
          <Input type="number" min="0" id="price" name="price" step={1000} />
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="address">Address</Label>
          <Input type="text" id="address" name="address" />
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
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" name="city" />
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="area">Total area</Label>
          <Input type="number" min="0" id="area" name="area" step={1} />
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="kitchen">Kitchen area</Label>
          <Input type="number" min="0" id="kitchen" name="kitchen" step={1} />
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="floor">Floor</Label>
          <Input type="number" min="0" id="floor" name="floor" step={1} />
        </div>
        <div className={styles.inputBlock + ` basis-1/3`}>
          <Label htmlFor="year">Year of construction</Label>
          <Input type="number" min="0" id="year" name="year" step={1} />
        </div>
        <div className={styles.inputBlock + ` basis-1/3  mt-5`}>
          <Button size={'default'} >Add</Button>
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
