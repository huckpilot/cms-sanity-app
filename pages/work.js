import Container from "../components/container";
import ProjectsGrid from "../components/projects-grid";
import Layout from "../components/layout";
import { getAllPostsForHome } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";

export default function Index({ allPosts, preview }) {
  const posts = allPosts;
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Mondial</title>
        </Head>
        <Container>
          {posts.length > 0 && (
            <div className="mb-100">
              <ProjectsGrid posts={posts} />
            </div>
          )}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
  };
}
