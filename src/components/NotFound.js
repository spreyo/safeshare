import React from 'react'
import './NotFound.css'

export const NotFound = () => {
    return (
        <>
            <h1 id="header">safeshare</h1>
            <h1 id="not-found">image not found</h1>
            <h1 id="go-back" onClick={() => { window.location = "/" }}>go back</h1>
        </>
    )
}
