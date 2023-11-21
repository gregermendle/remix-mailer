import { Outlet } from "@remix-run/react";
import {
  Layout,
  LayoutFooter,
  LayoutHeader,
  LayoutHeaderLogo,
  LayoutHeaderNav,
} from "./layout";

export default function __Layout() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutHeaderLogo />
        <LayoutHeaderNav />
      </LayoutHeader>
      <Outlet />
      <LayoutFooter />
    </Layout>
  );
}
