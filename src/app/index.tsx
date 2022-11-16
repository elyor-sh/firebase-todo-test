import React from 'react';
import './global.less'
import {Pages} from "../pages";
import {Toaster} from "../shared/ui";

const App = () => {
    return (
        <>
            <Toaster />
            <Pages />
        </>
    );
};

export { App }