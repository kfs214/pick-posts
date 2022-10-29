"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
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
    const composedTextStringified = JSON.stringify((0, composeText_1.composeText)({ heading, posts }));
    try {
        console.log('writing to output.txt...');
        fs.writeFileSync('output.txt', composedTextStringified);
    }
    catch (error) {
        console.error(error);
    }
    console.log('completed!');
});
app();
