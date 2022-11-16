import React from 'react';
import {observer} from "mobx-react-lite";
import cl from './style.module.less'
import {LoadingSpinnerModel} from "../index";
import {getInstance} from "../../../lib";

const loadingModel = getInstance(LoadingSpinnerModel)

const spinnerElements = new Array(12).fill(0)

export const LoadingSpinner = observer(() => {

    if(!loadingModel.loading){
        return <></>
    }

    return (
        <div className={cl.spinner}>
            <div className={cl.ldsSpinner}>
                {
                    spinnerElements.map((_, i) => (
                         <div key={i.toString()}/>
                    ))
                }
            </div>
        </div>
    );
});