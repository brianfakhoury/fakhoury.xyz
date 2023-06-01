---
tags: blog/webapps, blog/programming
date: June 1, 2023
publish: true
image: Blog/Assets/fakhoury_graphic_design_under_the_hood_of_a_web_application_3d__fe2db1b5-859b-4634-b52b-d27cc09a0fdd.png
slug: next13-4
origin:
description: 
---
# Why I'm Excited by Next.js 13.4

Next.js, the popular React framework, has been making waves in the web development community for quite some time now. With its latest release, Next.js 13.4, it has taken a significant leap forward, introducing a paradigm shift from page-based routing to app-based routing. This shift, along with other enhancements, has made Next.js 13.4 a game-changer, and here's why I'm excited about it.

## The Shift from Page Router to App Router

In traditional Next.js versions, routing was page-based. This meant that each file inside the `pages` directory was associated with a route based on its file name. While this approach was straightforward and easy to understand, it had its limitations, especially when it came to complex applications with dynamic routing needs.

Next.js 13.4 introduces the concept of an App Router, a significant shift from the page-based routing system. The App Router allows developers to define their routes programmatically, providing more flexibility and control over the routing of their application.

Here's a simple example of how you can define routes using the new App Router:

```jsx
import { AppRouter } from 'next/router'

export default function App() {
  return (
    <AppRouter>
      <AppRouter.Route path="/">
        <HomePage />
      </AppRouter.Route>
      <AppRouter.Route path="/about">
        <AboutPage />
      </AppRouter.Route>
      <AppRouter.Route path="/blog/:slug">
        <BlogPostPage />
      </AppRouter.Route>
    </AppRouter>
  )
}
```

In this example, we're defining three routes: the home page (`/`), the about page (`/about`), and a dynamic route for blog posts (`/blog/:slug`). The `:slug` part is a route parameter, allowing us to display different blog posts based on the URL.

## The Power of the App Router

The App Router is not just about defining routes. It also provides powerful features that make routing in Next.js more flexible and dynamic. Here are a few examples:

### Nested Routes

With the App Router, you can easily define nested routes. This is particularly useful for creating complex UIs where certain components remain the same across multiple routes. Here's an example:

```jsx
<AppRouter>
  <AppRouter.Route path="/dashboard">
    <DashboardLayout>
      <AppRouter.Route index>
        <DashboardHomePage />
      </AppRouter.Route>
      <AppRouter.Route path="/settings">
        <DashboardSettingsPage />
      </AppRouter.Route>
    </DashboardLayout>
  </AppRouter.Route>
</AppRouter>
```

In this example, the `DashboardLayout` component will be rendered for both `/dashboard` and `/dashboard/settings`, but the `DashboardHomePage` and `DashboardSettingsPage` components will be rendered based on the current URL.

### Route Transitions

The App Router also makes it easy to add transitions between routes. This can be done using the `useTransition` hook, which provides information about the current route transition.

```jsx
import { useTransition } from 'next/router'

export default function App() {
  const { status } = useTransition()

  return (
    <div className={status}>
      <AppRouter>
        {/* routes */}
      </AppRouter>
    </div>
  )
}
```

In this example, the `status` variable will be `'loading'` during a route transition and `'complete'` once the transition is finished. This can be used to apply different styles or animations during route transitions.

## Conclusion

Next.js 13.4, with its shift from page router to app router, has opened up a new world of possibilities

for web developers. The flexibility and control provided by the App Router make it a powerful tool for building complex, dynamic applications. The ability to define routes programmatically, create nested routes, and handle route transitions are just a few of the features that make this new routing system exciting.

In the spirit of the technological breakthroughs I've discussed in my previous articles, such as zero-knowledge proofs, I see the App Router as a similar leap forward in the realm of web development. It's a testament to the continuous innovation and evolution in the field, and I'm thrilled to see where Next.js will take us next.

As we continue to explore and push the boundaries of what's possible with Next.js and other cutting-edge technologies, I invite you to join me on this journey. Let's embrace these advancements, learn from them, and use them to build better, more efficient, and more user-friendly applications. After all, that's what technology and development are all about.

So, whether you're a seasoned Next.js developer or just starting out, I encourage you to dive into Next.js 13.4 and experience the power of the App Router for yourself. I'm sure you'll be as excited as I am about the possibilities it opens up. Happy coding!