import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Sidebar } from "./sidebar.js";

export const MobileMenu = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-[88vw] max-w-sm lg:hidden">
          <div className="relative h-full">
            <Dialog.Close className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <X className="h-4 w-4" />
            </Dialog.Close>
            <Sidebar />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
