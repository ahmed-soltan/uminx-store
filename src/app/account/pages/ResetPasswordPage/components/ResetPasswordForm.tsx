import { zodResolver } from "@hookform/resolvers/zod";
import { trans } from "@mongez/localization";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { navigateTo } from "@mongez/react-router";
import { resetPassword } from "app/account/services/auth";
import { Button } from "design-system/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "design-system/components/ui/form";
import { Input } from "design-system/components/ui/input";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { toast } from "shared/hooks/use-toast";
import { ResetPasswordFormSchema } from "shared/schemas/reset-password-form-schema";
import URLS from "shared/utils/urls";

export default function ResetPasswordForm() {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof ResetPasswordFormSchema>) => {
    try {
      await resetPassword(data);
      toast({
        variant: "success",
        title: trans("resetPasswordSuccess"),
      });
      form.reset();
      navigateTo(URLS.auth.login);
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 w-full max-w-[750px] bg-white rounded-lg p-5 md:p-10"
        onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="text-primary text-center text-xl md:text-2xl font-semibold">
          {trans("resetPassword")}
        </h1>
        {!!error && (
          <div className="bg-rose-500/15 p-4 rounded-md flex items-center gap-x-2 text-md text-rose-500 mb-6 w-full">
            <FiAlertTriangle className="size-5" />
            <p>{error}</p>
          </div>
        )}
        <div className="flex flex-col items-start justify-center space-y-4 w-full">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm text-gray">
                  {trans("password")} <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isLoading}
                    {...field}
                    placeholder={trans("password")}
                    className=" w-full h-12 text-base focus:ring-blue bg-[#f6f6f6]
                    focus-visible:ring-blue ring-blue flex rounded-full inset-0 placeholder:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm text-gray">
                  {trans("confirmPassword")} <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isLoading}
                    {...field}
                    placeholder={trans("confirmPassword")}
                    className=" w-full h-12 text-base focus:ring-blue bg-[#f6f6f6]
                    focus-visible:ring-blue ring-blue flex rounded-full inset-0 placeholder:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          variant={"primary"}
          size={"lg"}
          className="w-full rounded-full h-12">
          {trans("resetPassword")}
        </Button>
      </form>
    </Form>
  );
}
