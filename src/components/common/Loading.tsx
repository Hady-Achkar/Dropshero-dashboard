import React from 'react';
import type {FC} from 'react'
import classNames from "classnames";

interface IProps {
    full: boolean
}

const Wrapper: FC<IProps> = (props) => {
    const {full} = props
    return (
        <div className={classNames('flex justify-center items-center', full && 'h-screen')}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 my-5"/>
        </div>
    );
};

export default Wrapper;
