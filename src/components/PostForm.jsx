import React, {useState} from 'react';
import MyInput from "./UI/Input/MyInput";
import MyButton from "./UI/Button/MyButton";

const PostForm = (props) => {

    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e) =>{
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        props.create(newPost);
        setPost({title: '', body: ''});
    }

    return (
        <div>
            <form>
                <MyInput type="text"
                         placeholder='Title of post'
                         value={post.title}
                         onChange={e => setPost({...post, title: e.target.value})}/>
                <MyInput type="text"
                         placeholder='Description post'
                         value={post.body}
                         onChange={e => setPost({...post, body: e.target.value})}/>
                <MyButton onClick={addNewPost}>Create post</MyButton>
            </form>
        </div>
    );
};

export default PostForm;