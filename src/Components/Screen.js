import React from 'react'
import { Textfit } from 'react-textfit'

const Screen = props => (

    <Textfit mod="single" className="screen" max={50}>
        {props.value}
    </Textfit>
)



export default Screen