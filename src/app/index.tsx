import React from 'react';
import './global.less'
import {Pages} from "../pages";
import {Toaster} from "../shared/ui";
import {LoadingSpinner} from "../shared/ui";

const App = () => {
    return (
        <>
            <LoadingSpinner />
            <Toaster />
            <Pages />
        </>
    );
};

export { App }