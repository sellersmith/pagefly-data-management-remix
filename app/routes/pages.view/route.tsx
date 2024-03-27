import { LoaderFunctionArgs, json } from "@remix-run/node";
import SyncDataPage from "~/views/pages/sync";
import ViewwDataPage from "~/views/pages/view";

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  return json({ success: 1, data: ["123123123132"] });
};

export default function PagesView() {
  return <ViewwDataPage />;
}
