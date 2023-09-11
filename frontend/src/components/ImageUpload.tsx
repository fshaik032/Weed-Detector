import { useState }  from 'react';
import axios from 'axios';


function ImageUpload() {
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState('')


  function formSubmit(e: any) {
    e.preventDefault();

    console.log("sending")
    console.log(file)
    const data = new FormData();
    if (file == null) return
    data.append('file', file)
    axios.post("http://localhost:3000/upload", data, {
      responseType: "arraybuffer"
    }).then(response => {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )
      setImage(`data:image/jpeg;charset=utf-8;base64,${base64}`)
      
  })
    //console.log(typeof filebase64)
  }

  function convertFile(files: FileList|null) {
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string= fileRef.type || ""
      console.log("This file upload is of type:",fileType)
      console.log(files[0])
      setFile(files[0])
      setImage(URL.createObjectURL(files[0]));
      // const reader = new FileReader()
      // reader.readAsBinaryString(fileRef)
      // reader.onload=(ev: any) => {
      //   // convert it to base64
      //   setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
      //}
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        Choose an image to to upload
        <form onSubmit={formSubmit}>
          <input type="file" onChange={(e)=> convertFile(e.target.files)} />
          <hr />
          { true &&
            <>
            <p>
              Upload a picture of plants you want to classify as weeds or crop<br />
              </p>
            
          
            {
            <img src={image} />
            }

                          
            <hr />
            <button> Submit</button>
            
            </>
          }
        </form>
      </header>
    </div>
  );
}

export default ImageUpload;