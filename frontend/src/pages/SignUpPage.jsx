import { use, useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { data, Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  //Mutation
  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  //invalidateQueries in React Query (TanStack Query) is used to manually tell React Query to refetch specific data.
  // The basic info:
  //When you mutate data (e.g., create, update, or delete something), the cached data might become outdated.
  //So, to make sure your UI is showing the latest info, you use invalidateQueries to refetch that data.
  //why we should have to useMutation insted of the axios
  //because     1.Automatically tracks isPending, isSuccess, isError
  //            2.Easily handles side effects (onSuccess, onError)
  //            3.Works with cache updates (invalidateQueries, etc.)

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div
        className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100  
       rounded-xl shadow-lg overflow-hidden"
      >
        {/*signup -form left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/*logo*/}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              ByteStream
            </span>
          </div>
          {/* Error in the signup page*/}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold"> Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join ByteStream and start your language learning adventure!
                  </p>
                </div>
                <div className="space-y-3">
                  {/* full name */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* Email input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="John@gmail.com"
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* Password input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long.{" "}
                    </p>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account? {""}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* signup -form right side*/}

        <div className="hidden lg:flex w-full lg:w-1/2.bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/animation.gif"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
