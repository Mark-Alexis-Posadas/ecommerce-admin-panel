const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a12]">
      <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
