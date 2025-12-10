import {
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
} from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

export function Dropdown({ users, onEdit, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onEdit(users)}>Edit</DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDelete(users.vendor_uid)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
