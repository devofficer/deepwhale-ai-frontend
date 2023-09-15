import { Disclosure } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import clxs from "classnames";
import { useRouter } from "next/router";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const router = useRouter();
  const goToHomePage = () => {
    router.push("/");
  };

  return (
    <nav className="sticky top-0 md:relative bg-light dark:bg-main z-50 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div
              className="flex flex-shrink-0 items-center transition ease-in-out delay-150 hover:translate-x-2 hover:scale-110 hover:cursor-pointer"
              onClick={goToHomePage}
            >
              <img
                className="h-8 w-auto"
                src="/assets/logo.png"
                alt="DeepWhale AI"
              />
              <span className="ml-3 text-lg font-semibold font-mono text-main dark:text-white tracking-wider">
                deepwhale
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex ml-4 flex-shrink-0 items-center">
              <button
                onClick={handleThemeChange}
                className={clxs(
                  "relative",
                  "rounded-full",
                  "p-1",
                  "dark:bg-main",
                  "dark:text-secondary-card-text-color",
                  "dark:hover:bg-primary-card-color",
                  "dark:hover:text-secondary-card-color",
                  "bg-light",
                  "text-primary-card-text-color",
                  "hover:bg-secondary-card-color",
                  "hover:text-primary-card-color"
                )}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                {theme === "dark" ? (
                  <SunIcon
                    className="h-6 w-6 transition-all duration-500 ease-in-out hover:scale-110"
                    aria-hidden="true"
                  />
                ) : (
                  <MoonIcon
                    className="h-6 w-6 transition-all duration-500 ease-in-out hover:scale-110"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
