import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const CustomLoading = ({ loading }: { loading: boolean }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white text-pink-500">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl">We are working... on it</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center my-8 justify-center">
              <Image
                src="/progress.gif"
                alt="loading"
                width={100}
                height={100}
              />
              <span className="flex items-center text-center font-bold py-2 text-purple-900">
                Good things take time.
                <Image
                  src="/coffee-cup.gif"
                  alt="loading"
                  width={30}
                  height={30}
                />
                Have a cup of coffee and relax.
              </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="text-center text-red-600">
          Do not refresh the page
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
