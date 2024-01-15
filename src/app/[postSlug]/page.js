import React, { cache } from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import { MDXRemote } from "next-mdx-remote/rsc";

import { loadBlogPost } from "@/helpers/file-helpers";

import { BLOG_TITLE } from "@/constants";

import CodeSnippet from "@/components/CodeSnippet";

const getPostDetails = cache(loadBlogPost);

async function BlogPost({ params }) {
  const { postSlug } = params;
  const {
    content,
    frontmatter: { title, publishedOn },
  } = await getPostDetails(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
          }}
        />
      </div>
    </article>
  );
}

export async function generateMetadata({ params }) {
  const { postSlug } = params;
  const {
    frontmatter: { title, abstract },
  } = await getPostDetails(postSlug);

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: `${abstract}`,
  };
}

export default BlogPost;
