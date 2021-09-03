import React, {useEffect, useMemo, useRef, useState} from 'react';
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/Button/MyButton";
import MyInput from "./components/UI/Input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/Select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";
import {getPagesArray, getPagesCount} from "./utils/pages";


function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter  .query);
    let pagesArray = getPagesArray(totalPages);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = (response.headers['x-total-count']);
        setTotalPage(getPagesCount(totalCount, limit));
    })

    useEffect(() =>{
        fetchPosts()
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false);
    }

    const removePosts = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts()
    }

    return (
        <div className="App">
            <button onClick={fetchPosts}>get psots</button>
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>Create user</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter}
                        setFilter={setFilter}/>
            {postError &&
                <h1>Error ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
                : <PostList posts={sortedAndSearchedPosts} title={'Пости про JS'} remove={removePosts}/>
            }
            <div className='page__wrapper'>
                {pagesArray.map(p =>
                    <span onClick={() => changePage(p)}
                          key={p}
                          className={page === p ? 'page page__current' : 'page'}>
                        {p}
                    </span>
                )}
            </div>
        </div>
    );
}

export default App;
