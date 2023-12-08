import { useLoaderData, useParams } from "react-router-dom";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import DOMAIN from "../../services/endpoint";
import axios from "axios";


const EditPage = () => {
  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });
  const handleSubmit = async (values) => {
    const postData = {
      ...values,
      userId: userId,
    };

    const res = await axios.post(`${DOMAIN}/api/posts`, postData);

    if (res?.data.success) {
      navigate("/posts");
    }
  };
  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
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
  return [res.data];
};

export default EditPage;
