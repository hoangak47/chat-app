import React from 'react';
import Loading from '~/component/loading/index';

import './modalLoading.scss';

function ModalLoading(props) {
    return (
        <div className="modal-loading">
            <Loading />
        </div>
    );
}

export default ModalLoading;
