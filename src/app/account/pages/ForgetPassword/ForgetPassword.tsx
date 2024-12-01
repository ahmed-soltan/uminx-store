import ForgetPasswordForm from "app/account/pages/ForgetPassword/components/ForgetPasswordForm";
import Breadcrumbs from "design-system/components/Breadcrumbs";

export default function ForgetPasswordPage() {
  return (
    <div className="bg-lightGray w-full">
      <div className="max-w-[1400px] mx-auto py-6 px-4 w-full flex flex-col gap-14">
        <Breadcrumbs title="forgetPassword" />
        <div className="flex justify-center items-center">
          <ForgetPasswordForm />
        </div>
      </div>
    </div>
  );
}
