import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import ArticleCard from "../../components/misc/ArticleCard";
import { getAccessToken } from "../../services/jwt.service";
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
  const jwtToken = getAccessToken();

  const [header, payload] = jwtToken.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  const userId = decodedPayload.id;

  const author = userData?.find((obj) => obj.id === intId)['email'].split('@')[0];
  // const title = posts

  return (
    <>
      <ArticleCard 
      author={author}
      title={posts.title}
     />
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("I ran!");
  return res.data;
};

export const userDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/users`);
  console.log("I ran!");
  return res.data;
};

export default PostDetailsPage;
