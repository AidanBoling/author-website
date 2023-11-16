import { Edit } from 'react-admin';
import PageTitle from '../PageTitle';
import ImageForm from './ImageForm';

function ImageEdit() {
    return (
        <Edit title={<PageTitle resourceName="Image" />} redirect="show">
            <ImageForm edit />
        </Edit>
    );
}

export default ImageEdit;
