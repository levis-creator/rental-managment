"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const signUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const {message}=await res.json()
      toast.success(message)
      router.push('/login');
    } else {
      const { message } = await res.json();
      alert(message)
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            RentaliMani
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    {...register("email")}
                    className="bg-gray-50 border text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="bg-gray-50 border text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="bg-gray-50 border text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="w-4 h-4 rounded border dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 text-center"
                >
                  Create an account
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
