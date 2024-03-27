import { LoaderFunctionArgs, json } from '@remix-run/node'
import Layout from '../components/Layout'
import { Outlet, useLoaderData } from '@remix-run/react'

export const loader = async ({ request, params, context }: LoaderFunctionArgs) => {
  return json({ success: 1, data: ['123123123132'] })
}

export default function Pages() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
