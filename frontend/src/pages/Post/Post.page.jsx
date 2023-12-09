import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Skeleton } from "@mantine/core";
import { useLoaderData, Await, defer } from "react-router-dom";
import React from "react";
import classes from "./Post.module.css";

export const PostPage = () => {
  const posts = useLoaderData();

  return (
    <>
      <Container>
        <React.Suspense
          fallback={
            <Container className={classes.container}>
              <Skeleton
                color="blue"
                height={15}
                width={150}
                radius={8}
                mt={25}
              />
              <Skeleton
                color="blue"
                height={15}
                width={150}
                radius={8}
                mt={20}
              />
              <Skeleton
                color="blue"
                height={30}
                width={90}
                radius={8}
                mt={20}
              />
            </Container>
          }
        >
          <Await
            resolve={posts}
            errorElement={<p>Error loading package location!</p>}
          >
            {(data) => (
              <SimpleGrid cols={3}>
                {data.posts?.map((post) => (
                  <ArticleCardImage key={post.title} {...post} />
                ))}
              </SimpleGrid>
            )}
          </Await>
        </React.Suspense>
      </Container>
    </>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  return defer({ posts: res.data });
};
