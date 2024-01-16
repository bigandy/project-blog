import RSS from "rss";

import { NextResponse } from "next/server";

import { getBlogPostList } from "@/helpers/file-helpers";

// import { BLOG_TITLE } from "@/constants";

export async function GET() {
  const blogPosts = await getBlogPostList();
  var feed = new RSS({
    title: "ANDREW's BLOG",
    description: "A wonderful blog about JavaScript",
    url: "https://andrews-blog.vercel.app/",
  });
  await blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: `https://andrews-blog.vercel.app/${post.slug}`,
    });
  });

  return new NextResponse(feed.xml(), {
    headers: {
      "Content-type": "application/xml",
    },
    status: 200,
  });
}
