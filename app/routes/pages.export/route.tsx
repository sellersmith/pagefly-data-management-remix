import { LoaderFunctionArgs, json } from "@remix-run/node";
import ExportDataPage from "~/views/pages/export";

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  return json({ success: 1, data: ["123123123132"] });
};

export default function PagesView() {
  return <ExportDataPage />;
}
