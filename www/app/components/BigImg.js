import React from 'react'
import { connect } from 'dva';
import classnames from 'classnames'

class BigImg extends React.Component{
    constructor(){
        super()
    }

    render(){
        const {color,album,idx} = this.props.position
        const images = this.props.images
        return (
            <div className="bigImgPart">
                <div className='inner'>
                    <img className="bigImg" src={`/images/Corolla/${color}/${album}/${images[idx]}`}  alt=""/> 
                    <div className='rightBtn' onClick={()=>this.props.goNext()}></div>
                    <div className='leftBtn' onClick={()=>this.props.goPrev()}></div>
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
        goNext(){
            dispatch({"type":"carshow/goNext"})
        },
        goPrev(){
            dispatch({"type":"carshow/goPrev"})
        }
    }) 
)(BigImg)