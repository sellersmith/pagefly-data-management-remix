import type { MetaFunction, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DB } from "app/db.server";
import Layout from "../components/Layout";

export const meta: MetaFunction = () => {
  return [{ title: "PageFly Management System" }];
};

export const loader = async (): Promise<
  TypedResponse<{ success: boolean; data: any }>
> => {
  const collection = DB.wip.collection("shops");
  const data = await collection.find({}).toArray();

  return json({
    success: true,
    data,
  });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div>
        <h1 className="font-extrabold text-3xl text-sky-600">
          Welcome to Remix
        </h1>
      </div>
    </Layout>
  );
}
