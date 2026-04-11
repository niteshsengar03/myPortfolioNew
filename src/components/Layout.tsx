import { Link, Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { cn } from "../lib/utils";
import { socials } from "../content/socials";
import { Menu, X } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle smooth scrolling on route changes or hash changes
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Scroll spy — only active on home page
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["work", "writing", "videos", "contact"];

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: 0,
      }
    );

    // Small delay so DOM sections are mounted
    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 200);

    observerRef.current = observer;

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/", match: "" },
    { name: "Work", path: "/#work", match: "work" },
    { name: "Blog", path: "/#writing", match: "writing" },
    { name: "Videos", path: "/#videos", match: "videos" },
    { name: "Contact", path: "/#contact", match: "contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (path === "/" && location.pathname === "/" && !location.hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getIsActive = (item: (typeof navItems)[0]) => {
    if (location.pathname !== "/") {
      // On sub-pages (like /blog/:id, /projects/:id), only Home can be "active" loosely
      return false;
    }
    if (item.path === "/") {
      return !location.hash && activeSection === "";
    }
    // If we have a scroll-spy active section, use it
    if (activeSection) {
      return item.match === activeSection;
    }
    // Fall back to URL hash
    return location.hash === item.path.replace("/", "");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-blue-500/30 font-sans">
      <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          {/* ── Branded Logo ── */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="group shrink-0 flex items-center gap-1.5 select-none"
            aria-label="Home"
          >
            <span className="text-zinc-600 font-mono text-sm group-hover:text-blue-400 transition-colors duration-300">
              {"<"}
            </span>
            <span
              className="font-bold tracking-tight text-lg md:text-xl bg-gradient-to-r from-blue-400 via-violet-400 to-blue-300 bg-clip-text text-transparent
                         group-hover:from-violet-400 group-hover:via-blue-300 group-hover:to-violet-300
                         transition-all duration-500"
            >
              Nitesh
            </span>
            <span className="text-zinc-600 font-mono text-sm group-hover:text-violet-400 transition-colors duration-300">
              {"/>"}
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((item) => {
              const isActive = getIsActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={cn(
                    "relative transition-colors hover:text-zinc-100 whitespace-nowrap py-1",
                    isActive ? "text-zinc-100" : "text-zinc-500"
                  )}
                >
                  {item.name}
                  {/* Active underline */}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-blue-400 to-violet-400 transition-all duration-300",
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 pb-4 pt-1 border-t border-zinc-800/50 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = getIsActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "text-zinc-100 bg-zinc-800/60"
                      : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800/30"
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
