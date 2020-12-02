import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Link from "next/link";
import PrevNext from "../../components/prev-next";
import markdownStyles from "../../components/markdown-styles.module.css";
import BlockContent from "@sanity/block-content-to-react";

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-100">
              <Head>
                <title>
                  {post.title} Work page {CMS_NAME}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <div className="flex items-center justify-center grid grid-cols-12 gap-8 pt-8 py-8">
                <div className="col-span-1 mr-5">
                  <PrevNext slug={morePosts[0].slug} text={"Previous"} />
                </div>
                <div className="col-span-10">
                  <PostHeader
                    title={post.title}
                    brand={post.brand}
                    coverImage={post.coverImage}
                    vimeoid={post.vimeoid}
                    type={post.type}
                  />
                </div>
                <div className="col-span-1 justify-self-end ml-5">
                  <PrevNext slug={morePosts[1].slug} text={"Next"} />
                </div>
                <div className="col-span-5 flex-grow">
                  <h4>About</h4>
                  <BlockContent
                    blocks={post.content}
                    className={markdownStyles.markdown}
                  />
                </div>
                <div className="col-start-9 col-span-4 flex-grow">
                  <h4>Credits</h4>
                  <BlockContent
                    blocks={post.credits}
                    className={markdownStyles.markdown}
                  />
                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);
  return {
    props: {
      preview,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  };
}
