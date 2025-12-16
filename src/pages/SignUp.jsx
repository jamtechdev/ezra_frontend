import React from "react";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_30px_80px_rgba(79,70,229,0.25)] py-6 px-8 relative">
        {/* Logo / Brand */}
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
            E
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-gray-800 text-center mb-2">
          Welcome
        </h1>
        <p className="text-slate-500 text-center mb-8">
          Sign up to your account
        </p>

        {/* Form */}
        <form className="flex flex-col gap-5">
          {/* Email */}
          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-700">Email</span>
            <input
              type="email"
              placeholder="name@example.com"
              className="px-4 py-3 rounded-xl border-2 border-slate-200 text-sm
                         focus:outline-none focus:border-indigo-500"
              required
            />
          </label>

          {/* Password */}
          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-700">Password</span>
            <input
              type="password"
              placeholder="*****"
              className="px-4 py-3 rounded-xl border-2 border-slate-200 text-sm
                         focus:outline-none focus:border-indigo-500"
              required
            />
          </label>

          {/* phone */}
          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-700">Phone</span>
            <input
              type="text"
              placeholder="123456789"
              className="px-4 py-3 rounded-xl border-2 border-slate-200 text-sm
                         focus:outline-none focus:border-indigo-500"
              required
            />
          </label>

          {/* Actions */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="rounded border-slate-300" />
              Remember me
            </label>

            {/* <a
              href="#"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Forgot password?
            </a> */}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="text-[white] font-bold text-base cursor-pointer shadow-[rgba(102,126,234,0.35)_0px_18px_42px] transition-transform duration-[0.2s,box-shadow] delay-[0.2s] translate-y-0 mt-2 px-6 py-4 rounded-2xl border-[none];"
            style={{
              background:
                "linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)",
            }}
          >
            Sign up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400 font-semibold">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-3">
          <button className="w-full py-3 rounded-xl border-2 border-slate-200 font-semibold text-gray-700 hover:bg-slate-50">
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-center text-slate-500 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-indigo-600 font-bold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
