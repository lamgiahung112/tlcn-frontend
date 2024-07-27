import Header from "../components/header";
import { ReactNode } from "react";

function PublicPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-header-height">
      <Header />
      {children}
    </div>
  );
}

export default PublicPageLayout;
