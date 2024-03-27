import { LoaderFunctionArgs, json } from "@remix-run/node";
import SyncDataPage from "~/views/pages/sync";

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  return json({ success: 1, data: ["123123123132"] });
};

export default function PagesSync() {
  return <SyncDataPage />;
}
