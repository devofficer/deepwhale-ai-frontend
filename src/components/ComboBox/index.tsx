/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

const people = [
  { id: 1, name: "Leslie Alexander" },
  // More users...
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ComboBox() {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative mt-2">
        <Combobox.Input
          className={`
            w-full 
            rounded-md 
            border-2 
            py-1.5 pl-3 pr-10 
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
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person: any) => person?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-primary-card-text-color dark:text-secondary-card-text-color"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options
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
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    active
                      ? "bg-light dark:bg-primary-card-color text-secondary-card-color"
                      : "bg-primary-card-color text-secondary-card-color dark:bg-secondary-card-color dark:text-primary-card-color",
                    "relative cursor-pointer select-none py-2 pl-8 pr-4"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {person.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
