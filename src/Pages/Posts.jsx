import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";
import {getPagesCount} from "../utils/pages";
import PostService from "../API/PostService";
import MyButton from "../components/UI/Button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/Pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/Select/MySelect";


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter  .query);
    const lastElement = useRef();
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = (response.headers['x-total-count']);
        setTotalPage(getPagesCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() =>{
        fetchPosts(limit, page)
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false);
    }

    const removePosts = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>Create user</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter}
                        setFilter={setFilter}/>
            <MySelect value={limit}
                      onChange={value => setLimit(value)}
                      defaultValue='Number of items on page'
                      options={[
                          {value: 5, name: '5'},
                          {value: 10, name: '10'},
                          {value: 15, name: '15'},
                          {value: 25, name: '25 '},
                          {value: 100, name: 'Показати всі '},
                      ]}/>
            {postError &&
            <h1>Error ${postError}</h1>
            }
            <PostList posts={sortedAndSearchedPosts} title={'Пости про JS'} remove={removePosts}/>
            <div ref={lastElement}></div>
            {isPostsLoading &&
                 <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
            }
            <Pagination page={page}
                        changePage={changePage}
                        totalPages={totalPages}/>
        </div>
    );
}

export default Posts;
