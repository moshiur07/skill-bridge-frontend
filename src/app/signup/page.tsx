import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="bg-slate-300 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full shadow-xl shadow-slate-700 rounded-4xl max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  );
}
