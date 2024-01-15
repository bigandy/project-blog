import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import { MDXRemote } from "next-mdx-remote/rsc";

import { loadBlogPost } from "@/helpers/file-helpers";

async function BlogPost({ params }) {
  const { postSlug } = params;
  const {
    content,
    frontmatter: { title, publishedOn },
  } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
