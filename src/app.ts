import * as fs from 'fs';

import { pickPosts } from './pickPosts';
import { composeText } from './composeText';

const app = async (): Promise<void> => {
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

  const composedTextStringified = JSON.stringify(composeText({ heading, posts }));
  try {
    console.log('writing to output.txt...');
    fs.writeFileSync('output.txt', composedTextStringified);
  } catch (error) {
    console.error(error);
  }

  console.log('completed!');
};

void app();
