import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import ViewDataPage from "~/views/pages/view";

export const loader = async ({
  request,
  params,
  context,
}: LoaderFunctionArgs) => {
  return json({ success: 1, data: ["123123123132"] });
};

export const action = async ({
  request,
  params,
  context,
}: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());

  const data = !!formData &&
    formData.body && {
      ...JSON.parse(formData.body as string),
    };
  const { pageId, selectedEnvironment } = data;

  return json({ success: true, data });
};

export default function PagesView() {
  return <ViewDataPage />;
}
