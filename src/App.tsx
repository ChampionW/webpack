// src/App.tsx
import React, { useEffect } from 'react';
// import MyPromise from './utils/mypromise';
import CheckObject from './designmode/objectOrigin';
import SubClass from './designmode/inherit';
// import './app.css';

const App: React.FC = () => {
    useEffect(() => {
        // const check = CheckObject();
        // check.checkUsrname();
        // check.checkEmail();
        // check.getId();
        // console.dir(CheckObject);

        const sub = new SubClass();
        console.log(sub,sub.getMode());

        // const mypromise = new MyPromise(() => {
        //     throw new Error('error');
        // });
        // mypromise.then((value) => {
        //     console.log(value);
        // }, (error) => {
        //     console.log(error);
        // });
    }, []);
    return (<div>hello, world -- test</div>);
};

export default App;
