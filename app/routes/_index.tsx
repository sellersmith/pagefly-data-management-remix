import type { MetaFunction, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mongoClient } from "app/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "PageFly Management System" }];
};

export const loader = async (): Promise<
  TypedResponse<{ success: boolean; data: any }>
> => {
  // Use connect method to connect to the server

  const collection = mongoClient.rc.collection("shops");
  const data = await collection.find({}).toArray();

  return json({
    success: true,
    data,
  });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <h1 className="text-3xl underline m-5">Hello world!</h1>
      <h2 className="text-blue-600 font-extrabold text-5xl">
        TailwindCSS Is Working!
      </h2>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
