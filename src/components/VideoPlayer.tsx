'use client'
import * as React from 'react'
import ReactPlayer from 'react-player'
import type { ReactPlayerProps } from 'react-player'
import dynamic from 'next/dynamic'

type Props = {
    url: string
} & ReactPlayerProps

const VideoPlayer = ({ url, ...rest }: Props) => {
    return (
        <ReactPlayer width={'100%'} height={'100%'} url={url} {...rest} />

    )
}

export default VideoPlayer