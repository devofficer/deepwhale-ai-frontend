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
    router.push('/');
  }

  return (
    <nav className="sticky top-0 md:relative bg-secondary-card-color">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto transition ease-in-out delay-150 hover:translate-x-2 hover:scale-110 hover:cursor-pointer"
                src="/assets/logo.png"
                alt="DeepWhale AI"
                onClick={goToHomePage}
              />
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
                  "bg-secondary-card-color",
                  "text-secondary-card-text-color",
                  "hover:bg-primary-card-color",
                  "hover:text-secondary-card-color"
                )}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                {theme === "dark" ? (
                  <SunIcon className="h-6 w-6 transition-all duration-500 ease-in-out hover:scale-110" aria-hidden="true" />
                ) : (
                  <MoonIcon className="h-6 w-6 transition-all duration-500 ease-in-out hover:scale-110" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
