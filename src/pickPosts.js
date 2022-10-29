"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickPosts = void 0;
const wpapi_1 = __importDefault(require("wpapi"));
const MAX_POST_LENGTH = 100;
const getPickedPostLimit = (inputPostLimit) => {
    if (inputPostLimit === 0)
        return 0;
    if (!inputPostLimit)
        return 1;
    if (inputPostLimit > MAX_POST_LENGTH) {
        console.log(`up to ${MAX_POST_LENGTH} posts to be picked`);
        return MAX_POST_LENGTH;
    }
    return inputPostLimit;
};
const getPickedOffsets = (totalPosts, length) => {
    const candidates = [...Array(totalPosts).keys()];
    if (totalPosts <= length) {
        console.log(`matched posts: ${totalPosts}. all of them to be returned`);
        return candidates;
    }
    const pickedOffsets = [];
    [...Array(length)].forEach(() => {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        const [pickedItem] = candidates.splice(randomIndex);
        pickedOffsets.push(pickedItem);
    });
    return pickedOffsets;
};
const pickPosts = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { endpoint, categories, postLimit } = args;
    const wp = new wpapi_1.default({ endpoint });
    const pickedPostLimit = getPickedPostLimit(postLimit);
    console.log(`up to ${pickedPostLimit} post(s) to be picked`);
    const wpPostsRequest = (categories ? wp.posts().param({ categories }) : wp.posts()).perPage(1);
    const { _paging: { total: totalPosts }, } = yield wpPostsRequest.param({ _fields: ['id'] }).get();
    console.log('matched posts:', totalPosts);
    const pickedOffsets = getPickedOffsets(totalPosts, pickedPostLimit);
    const posts = yield Promise.all(pickedOffsets.map((pickedOffset) => __awaiter(void 0, void 0, void 0, function* () {
        return yield wpPostsRequest
            .param({ _fields: ['title', 'link'] })
            .offset(pickedOffset)
            .get()
            .catch((e) => {
            console.error(e);
        });
    })));
    return posts
        .filter((e) => e)
        .map(([{ link, title: { rendered }, },]) => ({ link, title: rendered }));
});
exports.pickPosts = pickPosts;
