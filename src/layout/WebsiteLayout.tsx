import React from 'react'
import { Outlet } from 'react-router-dom';

type Props = {}

const WebsiteLayout = (props: Props) => {
    return (
        <div style={{
            backgroundColor: '#C0C0C0', minHeight: '100vh'
        }}> <Outlet /></div >
    )
}

export default WebsiteLayout