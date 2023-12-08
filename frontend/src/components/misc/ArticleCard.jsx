import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import {
  Card,
  Container,
  Image,
  Text,
  ActionIcon,
  Button,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from "@mantine/core";
import classes from "./ArticleCard.module.css";
import { Link } from "react-router-dom";

export default function ArticleCard({
  author,
  title,
  category,
  content,
  image,
  isUserAuthor
}) {
  const linkProps = {
    href: "https://mantine.dev",
    target: "_blank",
    rel: "noopener noreferrer",
  };
  const theme = useMantineTheme();

  

  return (
    <div className={classes.body}>
      <Card withBorder radius="md" className={classes.card}>
        <Container className={classes.container}>
          <Container className={classes.content}>
            <Text className={classes.title} fw={500} component="a">
              {title}
            </Text>
            <Text className={classes.title} fw={500} component="a">
              {category}
            </Text>
            <Text fz="sm" c="dimmed" lineClamp={4}>
              {content}
            </Text>
            
          </Container>
          <Image src={image} style={{ width: '300px', height: '200px' }}/>
        </Container>

        <Group justify="space-between" className={classes.footer}>
          <Center>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
              size={24}
              radius="xl"
              mr="xs"
            />
            <Text fz="sm" inline>
              {author}
            </Text>
          </Center>
         {isUserAuthor && <Link to='./edit'><Button>Edit</Button></Link>}
          <Group gap={8} mr={0}>
            <ActionIcon className={classes.action}>
              <IconHeart
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.red[6]}
              />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconBookmark
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.yellow[7]}
              />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconShare
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card>
    </div>
  );
}
