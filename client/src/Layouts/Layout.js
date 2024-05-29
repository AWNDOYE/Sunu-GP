import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../Components/HomeSection/Menu/Menu";
import Footer from "../Components/HomeSection/Footer/Footer";


// Layout Component: Le composant Layout inclut le Menu et le Footer une seule fois. Il utilise Outlet de react-router-dom pour rendre les composants enfants en fonction de la route actuelle.

export default function Layout() {
  return (
    <div>
      <Menu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
