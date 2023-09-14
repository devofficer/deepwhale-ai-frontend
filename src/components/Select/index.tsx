import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

interface SelectProps {
  label?: string;
  data: Array<string>;
  handler: (item: string) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({ label, data, handler }: SelectProps) {
  const [selected, setSelected] = useState(data[0]);
  const handleChange = (e: string) => {
    setSelected(e);
    handler(e);
  }

  useEffect(() => {
    setSelected(data[0]);
  }, data)

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 text-secondary-card-color">{label}</Listbox.Label>
          <div className="relative w-full mt-2">
            <Listbox.Button
              className={`
                relative 
                w-full 
                cursor-default 
                px-4 py-2
                text-left 
                shadow-sm 
                ring-1 
                ring-inset 
                focus:outline-none 
                focus:ring-2 
                sm:text-sm 
                sm:leading-6
                bg-secondary-card-color
                text-primary-card-color
                ring-primary-card-color 
                focus:ring-primary-card-color
              `}
            >
              <span className="block truncate">{selected}</span>
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
                className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-primary-card-color py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
              >
                {data.map((item, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-secondary-card-color text-primary-card-color"
                          : "bg-primary-card-color text-secondary-card-color",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
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
                              className="h-5 w-5 text-primary-card-text-color"
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
