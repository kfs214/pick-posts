import { pickPosts } from './pickPosts';
import { composeText } from './composeText';

const app = async () => {
  const [endpoint, heading, postLimit, ...categoriesArg] = process.argv.slice(2);
  const posts = await pickPosts({
    endpoint,
    postLimit: isNaN(+postLimit) ? 1 : +postLimit,
    categories: categoriesArg.map((categoryStr) => +categoryStr).filter((e) => !isNaN(e)),
  });

  if (!posts.length) {
    console.log('picked 0 post. ending process...');
    return;
  }

  const composedText = composeText({ heading, posts });

  console.log(composedText);
};

app();
