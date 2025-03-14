import img0 from "@/../public/generated_images/0.png";
import img1 from "@/../public/generated_images/1.png";
import img2 from "@/../public/generated_images/2.png";
import img3 from "@/../public/generated_images/3.png";
import img4 from "@/../public/generated_images/4.png";
import img5 from "@/../public/generated_images/5.png";
import img6 from "@/../public/generated_images/6.png";
import img7 from "@/../public/generated_images/7.png";
import img8 from "@/../public/generated_images/8.png";
import img9 from "@/../public/generated_images/9.png";

const imgArray = [
  { src: img0.src, alt: "Image 0" },
  { src: img1.src, alt: "Image 1" },
  { src: img2.src, alt: "Image 2" },
  { src: img3.src, alt: "Image 3" },
  { src: img4.src, alt: "Image 4" },
  { src: img5.src, alt: "Image 5" },
  { src: img6.src, alt: "Image 6" },
  { src: img7.src, alt: "Image 7" },
  { src: img8.src, alt: "Image 8" },
  { src: img9.src, alt: "Image 9" },
];

export const getImgSrcByPostId = (postId: BigInt | number ) => {
    return imgArray[Number(String(postId).slice(-1))].src;
} 

export default imgArray;
