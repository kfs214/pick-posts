"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeText = void 0;
const composeText = (args) => {
    const { heading, posts } = args;
    const postsStringified = posts.map(({ title, link }) => `${title}\n${link}`).join('\n\n');
    return `${heading ? heading + '\n\n\n' : ''}${postsStringified}`;
};
exports.composeText = composeText;
