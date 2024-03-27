import { LoaderFunctionArgs, json } from '@remix-run/node'
import Layout from '../components/Layout'
import { useLoaderData } from '@remix-run/react'

export const loader = async ({ request, params, context }: LoaderFunctionArgs) => {
  return json({ success: 1, data: ['123123123132']})
}

export default function Pages() {
  const { data } = useLoaderData<typeof loader>()
  return (
    <Layout>
      <h1>Pages {data}</h1>

    </Layout>
  )
}
