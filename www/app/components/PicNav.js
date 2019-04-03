import React from 'react'
import classnames from 'classnames'
import { connect } from 'dva';

class PicNav extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    showPanels(){
        const length = this.props.imgarr.length
        const {album,color,idx} = this.props.position
        var ARR = []
        for (let i = 0; i < Math.ceil(length/6) ; i++) {
            ARR.push(
                    <ul key={i}>
                        {
                            this.props.imgarr.slice(i*6,i*6+6).map((item,index)=>{
                                return <li key={index}
                                className={classnames({"cur":idx == i*6 + index})}
                                onClick={()=>this.props.changeIdx(i*6 + index)}
                                >
                                    <img src={`/images/Corolla/${color}/${album}/${item}`} 
                                    alt=""/>
                                </li>
                            })
                        }
                    </ul>
            )   
        }
        return ARR
    }

    componentDidMount(){
        var self = this
        $(this.ol).on("mouseenter","li",function(){
            $(this).addClass('cur').siblings().removeClass('cur')
            $(self.unit).stop(true).animate({"left":-290*$(this).data('pagenumber')},400)
        })
        $(this.picnav).on("mouseleave",function(){
            var page = Math.floor(self.props.position.idx/6)
            $(self.unit).stop(true).animate({ "left": -290 * page }, 400);
            $(self.ol).find("li").eq(page).addClass("cur").siblings().removeClass("cur");
        })
    }



    componentWillUpdate(nextprops){
        const page = Math.floor(nextprops.position.idx/6)
        // $(this.ol).find('li').eq(page).addClass('cur').siblings().removeClass('cur')
        $(this.unit).stop(true).animate({"left":-290*page},400)
    }

    render(){
        const pageAmount = Math.ceil(this.props.imgarr.length/6)
        const curPage = Math.floor(this.props.position.idx/6)
        return(
            <div className="picNav" ref={(picnav)=>this.picnav=picnav}>
                        <div className="unit" ref={(unit)=>this.unit=unit}>
                            {this.showPanels()}
                        </div>
                        <div className="cl"></div>
                        <ol ref={(ol)=>this.ol=ol}>
                            {
                                pageAmount>1
                                ?
                                new Array(pageAmount).fill('').map((item,index)=>{
                                    return <li key={index} style={{"width":100/pageAmount + "%"}}
                                    className={classnames({"cur":index==curPage})}
                                    data-pagenumber = {index}
                                    ></li>
                                })
                                :
                                null
                            }
                        </ol>
            </div>
                         
           
        )
    }
}

export default connect(
    ({carshow:{images,position}})=>({
        imgarr:(()=>{
            if(images[position.color]){
                return images[position.color][position.album]
            }
            return []
        })(),
        position
    }),
    (dispatch)=>({
        changeIdx(idx){
            dispatch({"type":"carshow/changeIdx",idx})
        }
    })
)(PicNav) 