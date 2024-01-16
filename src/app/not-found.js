import { BLOG_TITLE } from "@/constants";

const NotFoundPage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginBlockStart: "3rem",
      }}
    >
      <h1>404 Not Found</h1>

      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
};

export async function generateMetadata() {
  return {
    title: `404 Not Found • ${BLOG_TITLE}`,
    description: `This page could not be found.`,
  };
}

export default NotFoundPage;
