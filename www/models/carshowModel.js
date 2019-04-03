export default{
    "namespace":"carshow",
    "state":{
        "images":{},
        "position":{
            "album":"view",
            "color":"",
            "idx":0
        }
    },
    "reducers":{
        init(state,{results}){
            return {
                ...state,
                "images":results,
                "position":{
                    ...state.position,
                    "color":Object.keys(results)[0],
                    "idx":0
                }
            }
        },
        changeAlbum(state,{album}){
            return {
                ...state,
                "position":{
                    ...state.position,
                    album,
                    idx: 0
                }

            }
        },
        changeColor(state,{color}){
            return {
                ...state,
                "position":{
                    ...state.position,
                    color,
                    "album":"view",
                    "idx":0
                }

            }
        },
        changeIdx(state,{idx}){
            return {
                ...state,
                "position":{
                    ...state.position,
                    idx
                }

            }
        },
        goNext(state,action){
            const albums = state.images[state.position.color]
            const imgarr = state.images[state.position.color][state.position.album].length 
            const albumarr =["view","center","detail"].filter((item)=>{
                return albums.hasOwnProperty(item)
            })
            const albumIdx = albumarr.indexOf(state.position.album)
            const colorIdx = Object.keys(state.images).indexOf(state.position.color)

            if(state.position.idx<imgarr-1){
                return {
                    ...state,
                    "position":{
                        ...state.position,
                        idx : state.position.idx+1
                    }
                }
            }else if(albumIdx<albumarr.length-1){
                return {
                    ...state,
                    "position":{
                        ...state.position,
                        album:albumarr[albumIdx+1],
                        idx : 0
                    }
                }
            }else if(colorIdx<Object.keys(state.images).length-1){
                return {
                    ...state,
                    "position":{
                        ...state.position,
                        album:"view",
                        idx : 0,
                        color:Object.keys(state.images)[colorIdx + 1]
                    }
                }
            }else{
                alert("已经是最后一张了！");
                return state
            }
            
        },
        goPrev(state,action){
            var album = state.position.album;
            var color = state.position.color;
            var albumkey = Object.keys(state.images[color]);
            var albumArr = ["view", "center", "detail"].filter((item) => {
                return albumkey.indexOf(item) != -1;
            })
            const colorArr = Object.keys(state.images);
            if (state.position.idx > 0) {
                return {
                    ...state,
                    position: {
                        ...state.position,
                        idx: state.position.idx - 1
                    }
                }
            } else if (albumArr.indexOf(album) > 0) {
                album = albumArr[albumArr.indexOf(album) - 1];
                return {
                    ...state,
                    position: {
                        ...state.position,
                        idx: state.images[color][album].length - 1,
                        album
                    }
                }
            } else if (colorArr.indexOf(color) > 0) {
                color = colorArr[colorArr.indexOf(color) - 1];
                albumkey = Object.keys(state.images[color]);
                album = albumArr[albumArr.length - 1];
                return {
                    ...state,
                    position: {
                        ...state.position,
                        idx: state.images[color][album].length - 1,
                        album,
                        color
                    }
                }
            } else {
                alert("已经是第一张了！");
                return state;
            }
    },
    },
    "effects":{
        *init_async({payload},{call,put}){
            const {results} = yield fetch('/api').then(data=>data.json())
            yield put({"type":"init",results})
        }
    }
}   