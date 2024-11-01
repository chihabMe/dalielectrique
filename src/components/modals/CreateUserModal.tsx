import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ContactUsForm from "@/app/_components/Contact/ContactUsForm";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import AddNewUserForm from "@/app/admin/dashboard/users/_components/AddNewUserForm";

const CreateUserModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button
        onClick={openModal}
        className="  rounded-sm hidden lg:block hover:ring-2 hover:ring-primary"
      >
        <PlusIcon />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl    outline-none ring-none ">
          <DialogHeader>
            <DialogTitle> Create a new admin user </DialogTitle>
            {/* <DialogDescription>
              this admin user will be able to manage the admin page
            </DialogDescription> */}
            <AddNewUserForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateUserModal;