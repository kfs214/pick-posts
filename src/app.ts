import { pickPosts } from './pickPosts';
import { composeText } from './composeText';

const app = async () => {
  const posts = await pickPosts({
    endpoint: 'https://sam.ple/wp-json',
    categories: [1, 2],
  });

  const composedText = composeText({ heading: '今週のおすすめ記事をお届け', posts });

  console.log(composedText);
};

app();
