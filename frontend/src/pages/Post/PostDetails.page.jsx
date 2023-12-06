import { Link, useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import ArticleCard from "../../components/misc/ArticleCard";

function PostDetailsPage() {
  const posts = [
    {
      id: 1,
      title: "Bird",
      category: "nature",
      content:
        "Belted Kingfishers are large-headed birds with a shaggy crest on the back of the head.",
      image:
        "https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_640.jpg",
      userId: 1,
    },
    {
      id: 2,
      title: "Beautiful BC",
      category: "nature",
      content: "BC is a province full of beauty at every corner.",
      image:
        "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      userId: 2,
    },
  ];

  return (
    <>
      {posts.map((post) => (
        <ArticleCard
          key={posts.id}
          author={post.userId}
          image={post.image}
          title={post.title}
          category={post.category}
          content={post.content}
        />
      ))}
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  return null;
};

export default PostDetailsPage;
