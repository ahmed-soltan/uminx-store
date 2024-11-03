import { zodResolver } from "@hookform/resolvers/zod";
import { trans } from "@mongez/localization";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { z } from "zod";

import { addressesAtom } from "app/account/atoms/address-atom";
import { Button } from "design-system/components/ui/button";
import { Form } from "design-system/components/ui/form";
import { toast } from "shared/hooks/use-toast";
import { AddressFormSchema } from "shared/schemas/address-form-schema";
import { Address } from "shared/utils/types";
import AddressFormInputs from "./AddressFormInputs";

interface AddressDetailsCardProps {
  address: Address;
}

export default function AddressDetailsCard({
  address,
}: AddressDetailsCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      name: address.name,
      email: address.email,
      phoneNumber: address.phoneNumber,
      address: address.address,
      default: address.isPrimary,
    },
  });

  const onSubmit = async (data: z.infer<typeof AddressFormSchema>) => {
    try {
      setIsLoading(true);
      const { default: isPrimary, ...addressData } = data;
      await addressesAtom.updateAddress(address.id, addressData);

      if (isPrimary) {
        await addressesAtom.setPrimaryAddress(address.id);
      }

      toast({
        variant: "success",
        title: "Address Updated",
        description: "Address has been updated successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "An error occurred while updating the address",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      form.reset();
      setIsEditing(false);
    }
  };

  const onDelete = async () => {
    setIsLoading(true);
    await addressesAtom.deleteAddress(address.id);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full gap-3">
      {!isEditing && (
        <>
          {address.isPrimary && (
            <h1 className="text-3xl font-semibold text-center">
              {trans("Default")}
            </h1>
          )}
          <h1 className="text-gray text-md">{address.name}</h1>
          <h1 className="text-gray text-md">{address.email}</h1>
          <h1 className="text-gray text-md">{address.phoneNumber}</h1>
          <h1 className="text-gray text-md">{address.address}</h1>
          <div className="flex items-center gap-5">
            <Button
              onClick={() => setIsEditing(true)}
              variant={"primary"}
              className="h-12 flex items-center gap-2 w-28">
              <FaRegEdit className="h-5 w-5" />
              {trans("Edit")}
            </Button>
            <Button
              onClick={onDelete}
              variant={"primary"}
              disabled={isLoading}
              className="h-12 flex items-center gap-2 w-28">
              <FaRegTrashAlt className="h-5 w-5" />
              {trans("Delete")}
            </Button>
          </div>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AddressFormInputs form={form} isLoading={isLoading} />
            <Button
              disabled={isLoading}
              variant={"primary"}
              className="w-full rounded-full h-14 text-md">
              {trans("Edit")}
            </Button>
            <Button
              disabled={isLoading}
              type="button"
              variant={"secondary"}
              className="w-full rounded-full h-14 text-md"
              onClick={() => setIsEditing(false)}>
              {trans("Cancel")}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
