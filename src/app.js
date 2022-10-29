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
Object.defineProperty(exports, "__esModule", { value: true });
const pickPosts_1 = require("./pickPosts");
const composeText_1 = require("./composeText");
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    const [endpoint, heading, postLimit, ...categoriesArg] = process.argv.slice(2);
    const posts = yield (0, pickPosts_1.pickPosts)({
        endpoint,
        postLimit: isNaN(+postLimit) ? 1 : +postLimit,
        categories: categoriesArg.map((categoryStr) => +categoryStr).filter((e) => !isNaN(e)),
    });
    if (!posts.length) {
        console.log('picked 0 post. ending process...');
        return;
    }
    const composedText = (0, composeText_1.composeText)({ heading, posts });
    console.log(composedText);
});
app();
