import type { MetaFunction, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { DBDevelopment, connectDatabases } from 'app/db.server'
import Layout from '../components/Layout'

export const meta: MetaFunction = () => {
  return [{ title: 'PageFly Management System' }]
}

export const loader = async (): Promise<TypedResponse<{ success: boolean; data: any }>> => {
  // Use connect method to connect to the server
  await connectDatabases()
  const db = DBDevelopment.db('pagefly')
  const collection = db.collection('shops')
  const data = await collection.find({}).toArray()

  return json({
    success: true,
    data,
  })
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>()
  console.log(data)
  return (
    <Layout>
      <div>
        <h1 className='font-extrabold text-3xl text-sky-600'>Welcome to Remix</h1>
      </div>
    </Layout>
  )
}
