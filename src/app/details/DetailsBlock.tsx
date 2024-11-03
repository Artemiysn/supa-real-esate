import { Posts as PostType } from "@prisma/client";
import {
  ArrowsUpFromLine,
  BadgeDollarSign,
  Building2,
  CookingPot,
  Hammer,
  House,
  Scaling,
} from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type DetailsBlockProps = {
  post: PostType;
};

const DetailsBlock: React.FC<DetailsBlockProps> = ({ post }) => {
  return (
    <div className="mb-4">
      <h4 className="scroll-m-20 text-xl font-bold pb-2 ">Details</h4>
      <Table className="max-w-[400px]">
        <TableBody>
          <TableRow>
            <TableCell>
              <BadgeDollarSign
                size={24}
                className="stroke-orange-300 mr-2 inline-block"
              />
              Offer Type
            </TableCell>
            <TableCell>
              <span className="font-bold capitalize ">{post.type}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <House
                size={24}
                className="stroke-orange-300 mr-2 inline-block"
              />
              Property Type
            </TableCell>
            <TableCell>
              <span className="font-bold capitalize ">{post.property}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Building2
                size={24}
                className="stroke-orange-300 mr-2 inline-block"
              />
              City
            </TableCell>
            <TableCell>
              <span className="font-bold capitalize ">{post.city}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Scaling
                size={24}
                className="stroke-orange-300 mr-2 inline-block"
              />
              Total Area
            </TableCell>
            <TableCell>
              <span className="font-bold capitalize ">{post.area}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <CookingPot
                size={24}
                className="stroke-orange-300 mr-2 inline-block"
              />
              Kitchen Area
            </TableCell>
            <TableCell>
              <span className="font-bold capitalize ">{post.kitchen}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <ArrowsUpFromLine
                size={24}
                className="stroke-orange-300 mr-2 inline-block"
              />
              Floor
            </TableCell>
            <TableCell>
              <span className="font-bold capitalize ">{post.floor}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Hammer
                size={24}
                className="stroke-orange-300 mr-2 inline-block"
              />
              Year of construction
            </TableCell>
            <TableCell>
              <span className="font-bold capitalize ">{post.year}</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DetailsBlock;
