import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText: string;
  handleClick: () => void;
  image?: string;
  children?: ReactNode;
  buttonIcon?: string;
}

const MeetingModel = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
  children,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModel;
