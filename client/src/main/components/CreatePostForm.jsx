import { useState } from 'react';
import { createPost } from '../api/createPost';

function CreatePostForm() {
    const [errorMessage, setErrorMessage] = useState('');
    const [postInput, setPostInput] = useState({
        title: '',
        content: '',
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setPostInput({ ...postInput, [name]: value });
    }

    async function submitPost(event) {
        event.preventDefault();

        const formData = { ...postInput, published: event.target.value };
        console.log(formData);

        await createPost(formData)
            .then(result => console.log(result))
            .then(setPostInput({ title: '', content: '' }))
            .catch(err => {
                console.log(err);
                setErrorMessage(
                    'Something went wrong -- unable to publish post'
                );
            });
    }

    return (
        <div>
            <form className="post-form">
                <div className="form-group">
                    <label htmlFor="newPostTitle">Title</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="title"
                        id="newPostTitle"
                        value={postInput.title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPostContent">Content</label>
                    <textarea
                        onChange={handleChange}
                        type="text"
                        name="content"
                        id="newPostContent"
                        value={postInput.content}
                        rows="8"></textarea>
                </div>
                <div className="btn-group">
                    <button
                        onClick={submitPost}
                        type="submit"
                        name="publish"
                        value="true">
                        Publish
                    </button>
                    <button
                        onClick={submitPost}
                        type="submit"
                        name="draft"
                        value="false">
                        Save As Draft
                    </button>
                </div>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default CreatePostForm;
