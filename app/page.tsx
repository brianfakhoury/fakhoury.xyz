import { Suspense } from 'react'
import { getLinks, getPosts } from '../lib'
import ClientHome from './components/ClientHome'

async function getLatestPost() {
  const posts = await getPosts()
  return posts.reduce((latest, post) =>
    new Date(post.date) > new Date(latest.date) ? post : latest
  )
}

export default async function Home() {
  const links = getLinks()
  const latestPost = await getLatestPost()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientHome links={links} latestPost={latestPost} />
    </Suspense>
  )
}