import { XCircleIcon } from "@heroicons/react/24/outline";

export default function ErrorBanner({
  heading,
  description,
}: {
  heading: string;
  description?: string;
}) {
  return (
    <div className="rounded-md bg-red-50 p-4 mt-5">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{heading}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
