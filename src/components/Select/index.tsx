import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

interface SelectProps {
  label?: string;
  data: Array<string>;
  selected: string;
  setSelected: (item: string) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({
  label,
  data,
  selected,
  setSelected,
}: SelectProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 dark:text-secondary-card-text-color text-primary-card-text-color">
            {label}
          </Listbox.Label>
          <div className="relative w-full mt-2">
            <Listbox.Button
              className={`
                relative 
                w-full 
                rounded-md 
                border-2 
                py-1.5 pl-3 pr-10
                min-h-8 
                shadow-sm 
                sm:text-sm 
                sm:leading-6
                focus:ring-1 
                focus:ring-offset-2
                outline-none
                dark:bg-secondary-card-color
                dark:text-secondary-card-text-color
                bg-light
                text-primary-card-text-color
                border-secondary-card-color 
                focus:border-secondary-card-color-active 
                focus:ring-secondary-card-color-active 
                focus:ring-offset-light
                dark:border-primary-card-color 
                dark:focus:border-primary-card-color-active
                dark:focus:ring-primary-card-color-active
                dark:focus:ring-offset-main
              `}
            >
              <span className="block truncate font-bold">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-primary-card-color"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`
                  absolute 
                  z-10 
                  mt-1 
                  max-h-60 
                  w-full 
                  overflow-auto 
                  rounded-md 
                  py-1 
                  text-base 
                  shadow-lg 
                  ring-1 
                  ring-opacity-5 
                  focus:outline-none 
                  sm:text-sm
                  bg-primary-card-color
                  dark:bg-secondary-card-color
                  ring-black 
                `}
              >
                {data.map((item, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-light dark:bg-primary-card-color text-secondary-card-color"
                          : "bg-primary-card-color text-secondary-card-color dark:bg-secondary-card-bg-color dark:text-primary-card-color",
                        "relative cursor-pointer select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {item}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active
                                ? "text-primary-card-text-color"
                                : "text-secondary-card-text-color",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon
                              className="h-5 w-5 text-primary-card-text-color dark:text-secondary-card-text-color"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
