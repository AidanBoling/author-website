import { useState } from 'react';

function CreatePostForm() {
    return (
        <form className="post-form" action="/compose" method="POST">
            <div className="form-group">
                <label for="newPostTitle">Title</label>
                <input type="text" name="postTitle" id="newPostTitle" />
            </div>
            <div className="form-group">
                <label for="newPostContent">Content</label>
                <textarea
                    type="text"
                    name="postContent"
                    id="newPostContent"
                    rows="8"></textarea>
            </div>
            <div className="btn-group">
                <button type="submit" name="postPublished" value="true">
                    Publish
                </button>
                <button type="submit" name="postSaveDraft" value="false">
                    Save As Draft
                </button>
            </div>
        </form>
    );
}

export default CreatePostForm;
