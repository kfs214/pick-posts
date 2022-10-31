import * as fs from 'fs';

import { pickPosts } from './pickPosts';
import { composeText } from './composeText';

const getProperties = () => {
  const endpoint = PropertiesService.getScriptProperties().getProperty('endpoint');

  const heading = PropertiesService.getScriptProperties().getProperty('heading') ?? '';

  const postLimitProperty = PropertiesService.getScriptProperties().getProperty('postLimit') ?? '';
  const postLimit = isNaN(+postLimitProperty) ? 1 : +postLimitProperty;

  const categoriesProperty =
    PropertiesService.getScriptProperties().getProperty('categories') ?? '';
  const categories = categoriesProperty
    .split(' ')
    .map((categoryStr) => +categoryStr)
    .filter((e) => !isNaN(e));

  return { endpoint, heading, postLimit, categories };
};

const app = async (): Promise<void> => {
  const { endpoint, heading, postLimit, categories } = getProperties();
  if (!endpoint) {
    console.log('endpoint is missing. ending process...');
    return;
  }

  const posts = await pickPosts({
    endpoint,
    postLimit,
    categories,
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
