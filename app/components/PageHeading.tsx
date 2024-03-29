import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@remix-run/react";

interface IPageHeading {
  title: string;
  backAction?: { url?: string; onAction?: Function };
}

export default function PageHeading({ title, backAction }: IPageHeading) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        {backAction && (
          <button
            type="button"
            className=" mr-3 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => {
              typeof backAction?.onAction === "function"
                ? backAction.onAction()
                : navigate(backAction?.url || "");
            }}
          >
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        <div className=" min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
