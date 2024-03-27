import { LoaderFunctionArgs, json } from "@remix-run/node";
import ModifyDataPage from "~/views/pages/modify";

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  return json({ success: 1, data: ["123123123132"] });
};

export default function PagesModify() {
  return <ModifyDataPage />;
}
