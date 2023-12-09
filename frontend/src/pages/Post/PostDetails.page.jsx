import { useLoaderData, useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import ArticleCard from "../../components/misc/ArticleCard";
import { getAccessToken } from "../../services/jwt.service";

function PostDetailsPage() {
  const responseData = useLoaderData();
  const authorData = responseData[1];
  const postData = responseData[0];
  const { id } = useParams();

  const jwtToken = getAccessToken();

  const [header, payload] = jwtToken.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  const userId = decodedPayload.id;
  
  if (!authorData || !Array.isArray(authorData) || authorData.length !== 2) {
    return <div>Loading...</div>; // Or handle loading state accordingly
  }

  const intId = parseInt(id);

  const authorId = postData?.find((obj) => obj.id === intId)?.userId

  const author = authorData?.find((obj) => obj.id === authorId)?.email?.split("@")[0] || '';
  const title = postData?.find((obj) => obj.id === intId)?.title;
  const category = postData?.find((obj) => obj.id === intId)?.category;
  const content = postData?.find((obj) => obj.id === intId)?.content;
  const image = postData?.find((obj) => obj.id === intId)?.image;

  const isUserAuthor = authorId === userId;

  console.log(isUserAuthor)

  return (
    <>
      <ArticleCard 
      author={author}
      title={title}
      category={category}
      content={content}
      image={image}
      isUserAuthor={isUserAuthor}
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
