import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { EEnvironments } from "~/constants/enum";
import { DB } from "~/db.server";
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
  try {
    const formData = Object.fromEntries(await request.formData());

    const data = !!formData &&
      formData.body && {
        ...JSON.parse(formData.body as string),
      };
    const { pageId, selectedEnvironment } = data;
    let page = null;
    switch (selectedEnvironment) {
      case EEnvironments.PRODUCTION:
        page = await DB.master
          .collection("shopifypages")
          .findOne({ _id: pageId });
        break;
      case EEnvironments.RC:
        page = await DB.rc.collection("shopifypages").findOne({ _id: pageId });
        break;
      default:
        page = await DB.wip.collection("shopifypages").findOne({ _id: pageId });
        break;
    }

    if (!page) {
      throw new Error("No page found");
    }

    return json({ success: true, data: page });
  } catch (error) {
    return json({
      success: false,
      message: error instanceof Error ? error.message : error,
    });
  }
};

export default function PagesView() {
  return <ViewDataPage />;
}
