import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import ArticleCard from "../../components/misc/ArticleCard";
import { useState, useEffect } from "react";

function PostDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await userDetailsLoader({ params: { id } });
        setUserData(result);
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/error"); // Navigate to an error page or handle the error in another way
      }
    };

    fetchUserData();
  }, [id, navigate]);

  const intId = parseInt(id)

  const posts = useLoaderData();

  console.log(posts)

  const author = userData?.find((obj) => obj.id === intId)['email'].split('@')[0];
  const title = posts.find((obj) => obj.id === intId)['title']
  const category = posts.find((obj) => obj.id === intId)['category']
  const content = posts.find((obj) => obj.id === intId)['content']
  const image = posts.find((obj) => obj.id === intId)['image']

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

  return res.data;
};

export const userDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/users`);

  return res.data;
};

export default PostDetailsPage;
