import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Dropdown } from "./Actions/Dropdown";


export function VendorTable({ users, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Agency</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.vendor_uid}>
            <TableCell>{user.vendor_id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.contact}</TableCell>
            <TableCell>{user.location}</TableCell>
            <TableCell>{user.agency}</TableCell>

            <TableCell>
              <Dropdown
                users={user}
                onEdit={() => onEdit(user)}
                onDelete={() => onDelete(user.vendor_uid)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
