// src/App.tsx
import React, { useEffect } from 'react';
import MyPromise from './utils/mypromise';
// import './app.css';

const App: React.FC = () => {
    useEffect(() => {
        const mypromise = new MyPromise(() => {
            throw new Error('error');
        });
        mypromise.then((value) => {
            console.log(value);
        }, (error) => {
            console.log(error);
        });
    }, []);
    return (<div>hello, world -- test</div>);
};

export default App;
