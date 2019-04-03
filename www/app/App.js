import React from 'react'
import { connect } from 'dva';
import "./styles/less.less"
import classnames from 'classnames'

import PicNav from './components/PicNav'
import Picker from './components/Picker'
import BigImg from './components/BigImg'

class App extends React.Component{
    constructor({init}){
        super()
        init()
    }
    render(){
        const {color,album,idx} = this.props.position
        const images = this.props.images
        return (
            <div className='albumWraper'>
                <BigImg></BigImg>
                <div className="rightPart">
                    <div className="titlebox">
                        <h1>Corolla</h1>   
                    </div>
                    <div className="cl"></div>
                    <Picker></Picker>
                    <div className="cl"></div>
                    <PicNav></PicNav>
                </div>
            </div>
        )
    }
}

export default connect(
    ({carshow:{images,position}})=>({
        "images":(()=>{
            if(images[position.color]){
                return images[position.color][position.album]
            }
            return []
        })(),
        position
    }),
    (dispatch)=>({
        init(){
            dispatch({"type":"carshow/init_async"})
        },
        goNext(){
            dispatch({"type":"carshow/goNext"})
        }
    }) 
)(App)