import { Create } from 'react-admin';
import ImageForm from './ImageForm';

function ImageCreate() {
    return (
        <Create redirect="list">
            <ImageForm />
        </Create>
    );
}

export default ImageCreate;

// [-] TODO
// Make sure if published=true, also sends the current date as publishDate...
