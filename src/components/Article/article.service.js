import * as firebase from "services";
import { toast } from "react-toastify";

const db = firebase.db.ref("/articles");
const storage=firebase.storage.ref();

class ArticleService {
 

  updateTime='';
  newUsersState=[];

  getAll() {
    return db;
    
  }

  getArt(){
    db.on("value", snapshot => {
      if (snapshot && snapshot.exists()) {
        snapshot.forEach(data => {
          const dataVal = data.val()

         this.newUsersState.push({
            key: data.key,
            title: dataVal.title,
            body: dataVal.body,
            lastModifiedDate: dataVal.lastModifiedDate,
            url: dataVal.url
          })

        })
      }
    })
    return this.newUsersState;
  }



  create(article){
 
    const key= db.push(article).key;
    const uploadImg=storage.child(key).child(article.image[0].name).put(article.image[0]);
    uploadImg.then(uploadTaskImg=>{console.log('up',uploadTaskImg)
      this.updateTime=uploadTaskImg.metadata.timeCreated;
      return uploadTaskImg.ref.getDownloadURL()
      
    })
    .then(url=>{
      return db.child(key).set({
        ...article,
        "lastModifiedDate":this.updateTime,
         "url" : url,
     })
    }).then(()=>{
      toast.success("Done")
    })
    
  }



  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).delete();
  }

  deleteAll() {
    return db.remove();
  }

  // storageImg(imgName,img){
  //    storage.child(imgName).put(img);
     
  // }
}

export default new ArticleService();
