import { LoaderFunctionArgs, json } from "@remix-run/node";
import ViewDataPage from "~/views/pages/view";

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  return json({ success: 1, data: ["123123123132"] });
};

export default function PagesView() {
  return <ViewDataPage />;
}
