import logoExpressive from "@/assets/images/logo_expressive.png";

function Header() {
  return (
    <div className="fixed px-4 h-header-height w-full inset-0 flex justify-between z-10 bg-white">
      <img src={logoExpressive} alt="logo" />
      <div className="flex items-center text-lg font-medium">Admin</div>
    </div>
  );
}

export default Header;
