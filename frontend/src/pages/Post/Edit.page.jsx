import { useLoaderData, useParams } from "react-router-dom";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";

const EditPage = () => {
  const details = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const title = details.find((obj) => obj.id === parseInt(id)).title;
  const category = details.find((obj) => obj.id === parseInt(id)).category;
  const image = details.find((obj) => obj.id === parseInt(id)).image;
  const content = details.find((obj) => obj.id  === parseInt(id)).content;

  console.log(title);

  const form = useForm({
    initialValues: {
      title: title,
      category: category,
      image: image,
      content: content,
    },
  });

  const handleSubmit = async (values) => {
    const res = await axios.put(`${DOMAIN}/api/posts/${id}`, values);

    if (res?.data.success) {
      navigate("/posts");
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          value={title}
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          value={category}
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          value={image}
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          value={content}
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
};

export const editDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  return res.data;
};

export default EditPage;
