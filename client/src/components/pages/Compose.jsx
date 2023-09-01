import { useState } from 'react';
import PageTitle from '../PageTitle';
import CreatePostForm from '../CreatePostForm';

function Compose() {
    return (
        <div className="main">
            <PageTitle title="Compose" />
            <CreatePostForm />
        </div>
    );
}

export default Compose;
