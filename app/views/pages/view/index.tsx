import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import JsonView from "react18-json-view";
import ErrorBanner from "~/components/ErrorBanner";
import PageHeading from "~/components/PageHeading";
import { EEnvironments } from "~/constants/enum";
import { classNames } from "~/utils/classnames";
import { useHTTP } from "~/utils/use-http";

const environments = [
  { value: EEnvironments.PRODUCTION, name: "Production" },
  { value: EEnvironments.RC, name: "RC" },
  { value: EEnvironments.WIP, name: "WIP" },
];

export default function ViewDataPage() {
  const [selectedEnvironment, setSelectedEnvironment] = useState(
    environments[1]
  );
  const [pageId, setPageId] = useState("");
  const [error, setError] = useState("");
  const [pageData, setPageData] = useState(null);
  const submit = useHTTP();

  return (
    <>
      <PageHeading title={"View page data"} backAction={{ url: "/pages" }} />
      <div className="border-b border-gray-900/10 pb-12 mt-10">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Listbox
              value={selectedEnvironment}
              onChange={setSelectedEnvironment}
            >
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    Enviroment
                  </Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <span className="block truncate">
                        {selectedEnvironment.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {environments.map((environment) => (
                          <Listbox.Option
                            key={environment.value}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-900",
                                "relative cursor-default select-none py-2 pl-3 pr-9"
                              )
                            }
                            value={environment}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {environment.name}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
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
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Page ID
            </label>
            <div className="mt-2">
              <input
                onInput={(e) => setPageId((e.target as any).value)}
                value={pageId}
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            const response = await submit(
              {
                body: JSON.stringify({
                  pageId,
                  selectedEnvironment: selectedEnvironment.value,
                }),
              },
              { method: "POST", navigate: false }
            );
            if (response.success) {
              setPageData(response.data);
              setError("");
            } else {
              setError(
                typeof response.message === "string"
                  ? response.message
                  : "Query failed"
              );
              setPageData(null);
            }
          }}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View
        </button>
      </div>

      {!!error && <ErrorBanner heading={error} />}
      {!!pageData && <JsonView src={pageData} />}
    </>
  );
}
