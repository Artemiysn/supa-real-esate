import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import fallback from "@/../public/fallback.png";
import { type ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8">
      {children}
    </h2>
  );
};

const page = () => {
  return (
    <div className="container px-8 py-8 max-w-[800px]">
      <Heading>About Us (page fully generated by ai)</Heading>
      <p className="mt-8">
        Our mission is to provide exceptional real estate services to our
        clients. We're committed to helping you find your dream home or
        investment property.
      </p>

      <Heading>Our Team</Heading>
      <div className="grid grid-cols-4 gap-4 mt-8">
        <Card>
          <CardHeader>
            <Image
              src={fallback.src}
              alt="fallback"
              className="rounded "
              width={200}
              height={200}
              priority={false}
              placeholder="blur"
              blurDataURL={fallback.src}
            />
          </CardHeader>
          <CardContent>
            <p className="text-sm">John Doe</p>
            <p>Real Estate Agent</p>
          </CardContent>
        </Card>
        {/* ... more team members ... */}
      </div>

      {/* Company History Section */}
      <Heading>Our History</Heading>
      <p className="mt-8">
        Established in 2023, [Your Agency Name] has quickly become a leading
        real estate agency in the area. We've helped countless clients achieve
        their real estate goals.
      </p>

      {/* Core Values Section */}
      <Heading>Our Core Values</Heading>
      <ul className="mt-8">
        <li>Integrity</li>
        <li>Excellence</li>
        <li>Innovation</li>
        <li>Client Satisfaction</li>
      </ul>

      {/* Contact Information Section */}
      <Heading>Contact</Heading>
      <div className="mt-8">
        <p>Phone: (123) 456-7890</p>
        <p>Email: info@youragency.com</p>
        <p>Address: 123 Main Street, Anytown, CA 12345</p>
      </div>
    </div>
  );
};

export default page;