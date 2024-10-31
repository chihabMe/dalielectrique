"use client";
import { deleteContact } from "@/app/actions";
import { getContacts } from "@/app/data/contacts-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
// import { useToast } from "@/hooks/use-toast";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// import { deleteEmailAction } from "../actions";

interface Props {
  data: Awaited<ReturnType<typeof getContacts>>["data"];
  totalEmails: number;
  currentPage: number;
  searchTerm: string;
}

export default function UsersListTable({
  data,
  totalEmails,
  currentPage,
  searchTerm,
}: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Handle search with debounce
  const handleSearch = (value: string) => {
    setSearchInput(value);

    // Clear previous timeout if user keeps typing
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to wait for 500ms before executing search
    const timeout = setTimeout(() => {
      router.push(
        `/admin/dashboard/contacts?search=${value}&page=${currentPage}`
      );
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contacts Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[calc(100vh-328px)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search users..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="md:w-1/3"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Registred at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.createdAt?.toLocaleDateString()}</TableCell>
                <TableCell>
                  <UserActionsMenu contactId={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <span className="text-sm text-muted-foreground">
          {totalEmails} contacts
        </span>
      </CardFooter>
    </Card>
  );
}

interface UserActionsMenuProps {
  contactId: string;
}

export const UserActionsMenu = ({ contactId }: UserActionsMenuProps) => {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem>
          <Button
            className="w-full"
            variant="destructive"
            size="sm"
            onClick={async () => {
              const result = await deleteContact({
                id: contactId,
              });
              if (result?.data?.success) {
                toast({
                  title: "Contact deleted",
                });
              } else {
                toast({
                  title: "Failed to delete contact",
                  variant: "destructive",
                });
              }
            }}
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
