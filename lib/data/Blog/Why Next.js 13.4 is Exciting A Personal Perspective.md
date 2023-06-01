---
tags: blog/webapps, blog/programming
date: June 1, 2023
publish: true
image: Blog/Assets/fakhoury_graphic_design_under_the_hood_of_a_web_application_3d__fe2db1b5-859b-4634-b52b-d27cc09a0fdd.png
slug: next13-4
origin:
description: 
---
# Why Next.js 13.4 is Exciting: A Personal Perspective

If you're like me, using Next.js to hack a personal blog together on the weekend, you're going to love the latest update from Next.js - version 13.4!

## A Little Background: The Page Router

Before we dive into the exciting new stuff, let's take a quick detour to understand how routing used to work in Next.js. Traditionally, Next.js used a system known as the "Page Router". In this system, every file inside the 'pages' directory automatically became a route. For instance, if you had a file named 'blog.js' inside your 'pages' directory, it would be accessible via the '/blog' route in your application.

```jsx
// pages/blog.js

export default function Blog() {
  return <div>Welcome to my blog!</div>
}
```

This approach was simple and intuitive, but it had its limitations. The main constraint was that it forced a strictly "pages-only" directory structure, which could lead to a cluttered directory if you had other files you wanted to keep alongside your pages.

## The Game Changer: The App Router

Now, let's get to the exciting part. Next.js 13.4 introduces a new feature called the App Router, which is a game changer for hobbyist developers like myself. The App Router allows us to have a single 'app' directory where we can organize our pages alongside any other related files. This concept is known as colocation and it allows for more efficient development.

```jsx
// app/blog/page.tsx

export default function Blog() {
  return <div>Welcome to my tech blog!</div>
}
```

In the example above, the 'page.tsx' file inside the 'blog' directory would be accessible via the '/blog' route in your application. This approach allows you to keep all files related to a specific feature or page together in the same directory, improving the maintainability and navigation of your codebase.

## Embracing a Feature-Driven Structure

The App Router encourages a feature-driven structure. A feature is a group of files that are related to each other and represent an area or topic of your project. For example, you might have features for your blog, a crypto tracker, and a script for automating some work tasks.

```jsx
// app/crypto-tracker/page.tsx

export default function CryptoTracker() {
  return <div>Welcome to my crypto tracker!</div>
}
```

In the example above, the 'page.tsx' file inside the 'crypto-tracker' directory would be accessible via the '/crypto-tracker' route in your application. This approach allows you to keep all files related to the 'crypto-tracker' feature together in the same directory.

## Why I'm Excited About the App Router

The App Router brings several benefits that make me excited:

1. **Colocation**: I can keep related files together, which makes it easier to understand and navigate my codebase.
2. **Scalability**: The feature-driven structure scales well as my projects grow.
3. **Flexibility**: I have more freedom in how I structure my projects.
4. **Intuitiveness**: The structure aligns with the way I think about features and functionality.

## A Glimpse at My Project Structure

Here's a glimpse at how I might structure a project using the App Router:

```jsx
// app structure
app/
├── components/
│   ├── FancyButton/
│   │   └── FancyButton.tsx
├── blog/
│   ├── BlogPost/
│   │   └── BlogPost.tsx
│   ├── page.tsx
│   └── useBlogPosts.ts
├── crypto-tracker/
│   ├── CryptoChart/
│   │   └── CryptoChart.tsx
│   ├── page.tsx
│   └── useCryptoData.ts
├── work-scripts/
│   ├── EmailAutomation/
│   │   └── EmailAutomation.tsx
│   ├── page.tsx
│   └── useWorkScripts.ts
├── hooks/
│   └── useSomething.ts
└── utils/
    └── makeThings.ts
```

In this structure, we have global folders like 'components', 'hooks', and 'utils'. We also have feature folders like 'blog', 'crypto-tracker', and 'work-scripts'. Each feature folder contains all the relevant files for that feature, including components, hooks, and a 'page.tsx' file for the route.

## Wrapping Up

The shift from the Page Router to the App Router in Next.js 13.4 is a significant development in the Next.js ecosystem. It provides developers with more flexibility and control over their project structure, making it easier to build and maintain large-scale applications. As a hobbyist, I find this update particularly exciting as it aligns with the way I think about features and functionality, making my development process more intuitive and efficient. So, if you're like me, hacking away on personal projects over the weekend, give Next.js 13.4 a try. I'm sure you'll find it as exciting as I do as I implement it for this blog! Happy coding!