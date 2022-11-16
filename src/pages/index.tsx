import React from 'react';
import {TodosPage} from "./todos";
import {Layout} from "../shared/ui";
import {Header} from "../widgets/header";
import {Footer} from "../widgets/footer";

const Pages = () => {
    return (
        <>
            <Layout
                header={<Header />}
                footer={<Footer />}
            >
                <TodosPage />
            </Layout>
        </>
    );
};

export {Pages}