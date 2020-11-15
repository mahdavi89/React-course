import React, { useEffect } from 'react'
import * as firebase from "services";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from 'moment';
const db = firebase.db.ref("/articles");
const storage=firebase.storage.ref();


export const ServiceContext=React.createContext()

export default function ServiceProvider({children}) {
    const [article,setArticle]=useState()
    const[loading,setLoading]=useState(false);
    const [post, setPost] = useState([]);
    const [fileVal, setFileVal] = useState([]);
  //  const [files,setFiles]=useState({lastModified:'', name: '', size: '',type:''})
  let files={lastModified:'', name: '', size: '',type:''}
    let newUsersState = [];
    let childArticle=[];
    let  updateTime='';

    const getAll=()=>{
        db.on("value", snapshot => {
            if (snapshot && snapshot.exists()) {
              snapshot.forEach(data => {
                const dataVal = data.val()
      
                newUsersState.push({
                  key: data.key,
                  title: dataVal.title,
                  body: dataVal.body,
                  lastModifiedDate: dataVal.lastModifiedDate,
                  url: dataVal.url
                })
      
              })
              setArticle(newUsersState)
            }
          })
        
    } 

   const create=(postCreate)=>{
    setLoading(true)
        const key= db.push(postCreate).key;
        const uploadImg=storage.child(key).child(postCreate.image[0].name).put(postCreate.image[0]);
        uploadImg.then(uploadTaskImg=>{console.log('uploadTaskImg',uploadTaskImg)
         updateTime=uploadTaskImg.metadata.timeCreated;
          return uploadTaskImg.ref.getDownloadURL()
          
        })
        .then(url=>{console.log('url',url)
          return db.child(key).set({
            ...postCreate,
            "lastModifiedDate":updateTime,
             "url" : url,
         })
        }).then(()=>{
            setLoading(false);
          toast.success("Done")
        }).catch(()=>{
            //setLoading(true)
          toast.error('error')
          setLoading(false);
        })
    }

    const update=(newPost,exPost)=>{
      console.log('expost',exPost)
      console.log('newPost',newPost)
      const deleted= firebase.storage.refFromURL(exPost.url);
      deleted.delete().then((del)=>{console.log('del',del)
        const uploadImg=storage.child(exPost.key).child(newPost.image[0].name).put(newPost.image[0]);
        return uploadImg
      }).then(uploadTaskImg=>{console.log('uploadTaskImg',uploadTaskImg)
        updateTime=uploadTaskImg.metadata.timeCreated;
       return uploadTaskImg.ref.getDownloadURL()
       
      })
      .then(url=>{console.log('url',url)
      return db.child(exPost.key).update({
          "title":newPost.title,
          "body":newPost.body,
        "lastModifiedDate":updateTime,
         "url" : url,
     })
    }).then(()=>{
       // setLoading(false);
      toast.success("Done")
    }).catch(()=>{
       // setLoading(true)
      toast.error('error')
     // setLoading(false);
    })
    }


    const deleteArticle=(card)=>{
      console.log('deletecard',card)
      const deletedImg= firebase.storage.refFromURL(card.url);
      deletedImg.delete().then(()=>{
        const deletedArticle=db.child(card.key).remove();
        return deletedArticle
      }).then(()=>{
        // setLoading(false);
       toast.success("Done");
        
     }).catch(()=>{
        // setLoading(true)
       toast.error('error')
      // setLoading(false);
     })
    }

    
    const getImage=(url)=>{console.log('kk',url);
    const dataVal=firebase.storage.refFromURL(url).fullPath;
  
     return storage.child(dataVal).getMetadata().then((res)=>{
        console.log('img',res.name);
        var dateTime=moment(res.updated).unix();
        
        const FileList = [];
        FileList.push({file:{
         lastModified:dateTime,
          name:res.name,
          size:res.size,
         type:res.contentType,}
        })
        console.log('fileimg',FileList)
        return FileList;
      
     
      })
     
    }

const getChild=(id)=>{
  console.log('getchil',id)
  setLoading(true)
  db.child(id).on("value", snapshot => {
    if (snapshot && snapshot.exists()) {
    const dataVal = snapshot.val()
    childArticle.push({
        key: snapshot.key,
        title: dataVal.title,
        body: dataVal.body,
        lastModifiedDate: dataVal.lastModifiedDate,
        url: dataVal.url
    })
    console.log('childArticle',childArticle)
    console.log('postServise',post)
    setPost(childArticle)
    setLoading(false);
    
  }

})
}


  //     const toDataURL = url => fetch(url)
  //     .then(response => response.blob())
  //     .then(blob => new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.onloadend = () => resolve(reader.result)
  //     reader.onerror = reject
  //     reader.readAsDataURL(blob)
  //    }))



  // function dataURLtoFile(dataurl, filename) {
  //    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  //    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  //    while(n--){
  //    u8arr[n] = bstr.charCodeAt(n);
  //    }
  //  return new File([u8arr], filename, {type:mime});
  // }

// const fileArr=[];

//   const getOneChild=(key)=>{console.log('kk',key);
//     setLoading(true)
//   db.child(key).on("value", snapshot => {

//     const dataVal = snapshot.val()
//     newUsersState.push({
//         key: snapshot.key,
//         title: dataVal.title,
//         body: dataVal.body,
//         lastModifiedDate: dataVal.lastModifiedDate,
//         url: dataVal.url
//     })
//     setPost(newUsersState)
//     setLoading(false)
// })

// if(post){
//     console.log('imgpost',post)
//     toDataURL(post.url)
//     .then(dataUrl => {
//        console.log('Here is Base64 Url', dataUrl)
//        var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
//        console.log("Here is JavaScript File Object",fileData)
//        fileArr.push(fileData)
//        console.log("fileArr",fileArr[0])
//        console.log("fileArr",fileArr)
//        return fileArr[0];
//      }).then((res)=>{
//          setFileVal(res);
        
//      })
// }

//   }


  // const getImage=(url)=>{console.log('kk',url);
 
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = function(event) {
  //     var blob = xhr.response;
  //   };
  //   xhr.open('GET', url);
  //   xhr.send();
  // console.log('urlff',url)
 
  

  // }

    const value=React.useMemo(()=>({article,getAll,create,loading,update,deleteArticle,getImage,getChild,post,loading}))
    return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
    )
}

