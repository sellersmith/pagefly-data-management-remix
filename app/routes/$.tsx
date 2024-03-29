import { redirect, type LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirect("/");
};

export default function NotFoundPage() {
  return <h2>Page not found</h2>;
}
