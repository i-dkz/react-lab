import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import ArticleCard from "../../components/misc/ArticleCard";
import { useState, useEffect } from "react";

function PostDetailsPage() {
  const responseData = useLoaderData();
  const authorData = responseData[1];
  const postData = responseData[0];
  const { id } = useParams();
  
  if (!responseData || !Array.isArray(responseData) || responseData.length !== 2) {
    return <div>Loading...</div>; // Or handle loading state accordingly
  }

  const intId = parseInt(id);
  
  const author = authorData?.find((obj) => obj.id === intId)?.email?.split("@")[0] || '';
  const title = postData.find((obj) => obj.id === intId)['title'];
  const category = postData.find((obj) => obj.id === intId)['category'];
  const content = postData.find((obj) => obj.id === intId)['content'];
  const image = postData.find((obj) => obj.id === intId)['image'];

  return (
    <>
      <ArticleCard 
      author={author}
      title={title}
      category={category}
      content={content}
      image={image}
     />
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  const resTwo = await axios.get(`${DOMAIN}/api/users`)
  return [res.data, resTwo.data];
};

export default PostDetailsPage;
