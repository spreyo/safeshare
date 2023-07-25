import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react'

function App() {
  useEffect(()=>{
    window.addEventListener("paste", function(e){
      var item = Array.from(e.clipboardData.items).find(x => /^image\//.test(x.type));
        
      var blob = item.getAsFile();
  
      var img = new Image();
  
      var input = document.getElementById("fileInput");
      var displayImage = document.getElementById("image");

      img.onload = function(){
          // document.body.appendChild(this);
      };
  
      img.src = URL.createObjectURL(blob);
      input.src = img.src;
      displayImage.src = img.src;
      
    });
  }, [])
  return (
    <>
      <div>
        <input type="file" accept="image/*" placeholder='image' id="fileInput"></input>
        <img id="image"></img>
      </div>
    </>
  );
}

export default App;
