import { svgProps } from '@/types/svgType'
import { useState } from 'react'

function Svg(props:svgProps) {
    const [symbolId]=useState(`${props.prefix?props.prefix:'#icon'}-${props.name}`)
  return (
    <>
        <svg name={props.name}>
            <use href={symbolId}></use>
        </svg>
    </>
  )
}


export default Svg
