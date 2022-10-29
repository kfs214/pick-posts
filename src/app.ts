import { pickPosts } from './pickPosts';

const app = async () => {
  const posts = await pickPosts({
    endpoint: 'https://sam.ple/wp-json',
    categories: [1, 2],
  });

  console.log(posts);
};

app();
