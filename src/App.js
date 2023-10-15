import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { Route } from 'wouter';
import { View } from './components/View';
import { NotFound } from './components/NotFound';

function App() {
  const [shareURL, setShareURL] = useState('');

  useEffect(() => {
    window.addEventListener("paste", function (e) {
      if (window.location.pathname != "/") {
        return;
      }
      var item = Array.from(e.clipboardData.items).find(x => /^image\//.test(x.type));

      var blob = item.getAsFile();

      var img = new Image();
      // var input = document.getElementById("fileInput");
      var displayImage = document.getElementById("image");

      img.src = URL.createObjectURL(blob);
      // input.src = img.src;
      displayImage.src = img.src;
      var base64;
      var id;
      var fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {

        var img = new Image();
        var maxWidth = 1920;
        var maxHeight = 1080;
        img.onload = function () {
          var cnvs = document.createElement('canvas');
          var rectRatio = img.width / img.height;
          var boundsRatio = maxWidth / maxHeight;
          var w, h;
          if (rectRatio > boundsRatio) {
            w = maxWidth;
            h = img.height * (maxWidth / img.width);
          } else {
            w = img.width * (maxHeight / img.height);
            h = maxHeight;
          }
          cnvs.width = w;
          cnvs.height = h;
          var ctx = cnvs.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          base64 = cnvs.toDataURL();
          id = crypto.randomUUID();
          id = id.split(/-/g)[0]
          console.log(id);
          resizeImgDiv(cnvs);

          fetch("http://192.168.0.117:3001/image", {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
              "blob": base64,
              "id": id,
              "views": 0
            }),
          }).then(() => setShareURL(`http://localhost:3000/view?id=${id}`));
        }

        img.src = fileLoadedEvent.target.result;

      }


      fileReader.readAsDataURL(blob);




    });
  }, [])

  function gcd(a, b) {
    return (b == 0) ? a : gcd(b, a % b);
  }

  function resizeImgDiv(canvas) {
    const imgDiv = document.getElementById("imgDiv");
    const r = gcd(canvas.width, canvas.height);
    console.log(canvas.width / r);
    var width = canvas.width / r;
    var height = canvas.height / r;

    while ((width > 300 && height > 600) || (width > 600 && height > 300)) {
      width = width / 3.5;
      height = height / 3.5;
      console.log(width, height);
    }

    while ((width < 300 && height < 600) || (width < 600 && height < 300)) {

      width = 3.5 * width;
      height = 3.5 * height;
      console.log(width, height);
    }
    imgDiv.style.width = `${width}px`;
    imgDiv.style.height = `${height}px`;

  }

  function copyShareURL() {
    navigator.clipboard.writeText(shareURL);
  }

  return (
    <>
      <Route path='/'>
        <h1 id="header">safeshare</h1>
        <div id="imgDiv" >
          {/* <input type="file" accept="image/*" placeholder='image' id="fileInput"></input> */}
          <img id="image"></img>
        </div>
        <h1 id="shareURL" style={{ display: shareURL == '' ? "none" : "block" }}>{shareURL}</h1>
        <div id="copyIcon" style={{ display: shareURL == '' ? "none" : "block" }} onClick={() => copyShareURL()}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z" /></svg>
        </div>
      </Route>
      <Route path='/view'>
        <View />
      </Route>
      <Route path='/404'>
        <NotFound />
      </Route>
    </>
  );
}

export default App;
