import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '@/types'

export function getBlogPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'data/blog')
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames.filter(fileName => fileName.endsWith('.md')).map(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      tags: data.tags.split(', ').map((tag: string) => tag.substring(5)),
      date: data.date,
      slug: data.slug,
      origin: data.origin,
      image: data.image,
      description: data.description,
      title: content.substring(2, content.indexOf('\n\n') + 1),
      body: content.substring(content.indexOf('\n\n') + 1),
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}