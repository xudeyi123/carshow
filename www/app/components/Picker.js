import React from 'react'
import classnames from 'classnames'
import { connect } from 'dva';

class Picker extends React.Component{
    constructor({position}){
        super()
        this.state={

        }
       
    }

    showAlbums(){
        var o = {
            "view" : "外观",
            "center" : "内饰",
            "detail" : "细节"
        }

        var albumobj = this.props.images[this.props.position.color]
        if(albumobj&&this.props.position){
            var arr = []
            var count = 0
            for(let k in o){
                if(albumobj.hasOwnProperty(k)){
                    arr.push(
                        <li className = {classnames({"cur":k == this.props.position.album})} 
                        key={count++} 
                        onClick={()=>this.props.changeAlbum(k)}
                        >
                            {o[k]}（{albumobj[k].length}）
                        </li>
                    )
                }
            }
            return arr
        }
        return null
    }

    
    
    render(){
        const {images,position} = this.props
   
        const colors = Object.keys(images)
    
        const curcolor = position.color
        return(
            <div className='picker'>
                <ul className="album">
                    {this.showAlbums()}
                </ul>
                <div className="cl"></div>
                <ul className='color'>
                    {
                        colors.map((item,index)=>{
                        return <li
                        key={index} style={{"backgroundColor":item}}
                        className={classnames({"cur":curcolor==item})}
                        onClick={()=>this.props.changeColor(item)}
                        ></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    ({carshow})=>({
        "images":carshow.images,
        "position" :carshow.position
    }),
    (dispatch)=>({
        changeAlbum(album){
            dispatch({"type":"carshow/changeAlbum",album})
        },
        changeColor(color){
            dispatch({"type":"carshow/changeColor",color})
        }
    })
)(Picker)