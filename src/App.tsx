import React from 'react';
import '@/styles/init.scss'
import AA from '@/components/AA'
import img from './assets/logo.png' 

export default function App() {
    const arr: Array<number> = [1, 2, 3, 14, 115]
    return (
        <div className='box'>
            {
                arr.map((item, index) => {
                    return (
                        <div key={index} className='item'>
                            <div className='b'>
                                <span>{item}</span>
                            </div>
                            <img src={img} alt="" />
                        </div>
                    )

                })
            }
            <AA />
            <h1>66666666666666</h1>
        </div>
    );
}
