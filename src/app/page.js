import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";

import { getBlogPostList } from "@/helpers/file-helpers";

import { BLOG_TITLE } from "@/constants";

const blogPosts = await getBlogPostList();

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPosts.map((post) => (
        <BlogSummaryCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={post.publishedOn}
        />
      ))}
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: `${BLOG_TITLE}`,
    description: {
      content: "A wonderful blog about JavaScript",
    },
  };
}

export default Home;
