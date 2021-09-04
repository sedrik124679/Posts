import PostIdPage from "../Pages/PostIdPage";
import Posts from "../Pages/Posts";
import About from "../Pages/About";

export const routes = [
    {path: '/about', component: About, exact: true},
    {path: '/posts', component: Posts, exact: true},
    {path: '/posts/:id', component: PostIdPage, exact: true},
]