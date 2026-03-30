import { Link, Outlet, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { cn } from "../lib/utils";
import { socials } from "../content/socials";

export default function Layout() {
  const location = useLocation();

  // Handle smooth scrolling on route changes or hash changes
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          // Calculate offset to account for the sticky navbar
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  const navItems = [
    { name: "Home", path: "/", match: "" },
    { name: "Work", path: "/#capstone", match: "capstone" },
    { name: "Mini", path: "/#mini", match: "mini" },
    { name: "Blog", path: "/#writing", match: "writing" },
    { name: "Videos", path: "/#videos", match: "videos" },
    { name: "Contact", path: "/#contact", match: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // If we are already on the exact same path (Home), just scroll to top smoothly
    if (path === "/" && location.pathname === "/" && !location.hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-blue-500/30 font-sans">
      <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          <Link 
            to="/" 
            onClick={(e) => handleNavClick(e, "/")}
            className="text-zinc-100 font-medium tracking-tight hover:text-blue-400 transition-colors shrink-0 text-lg md:text-xl"
          >
            Nitesh
          </Link>
          <div className="flex items-center justify-center w-full md:w-auto gap-3 sm:gap-5 md:gap-8 text-xs sm:text-sm md:text-base">
            {navItems.map((item) => {
              const isActive = item.path === "/" 
                ? location.pathname === "/" && !location.hash 
                : (location.pathname === "/" && location.hash === item.path.replace("/", "")) || 
                  (location.pathname !== "/" && item.match && location.pathname.includes(item.match));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={cn(
                    "transition-colors hover:text-zinc-100 whitespace-nowrap",
                    isActive ? "text-zinc-100" : "text-zinc-500"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-6 py-12 md:py-24">
        <Outlet />
      </main>
      <footer className="border-t border-zinc-900 mt-24">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Nitesh Sengar.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-zinc-300 transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
