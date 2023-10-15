import React from 'react'
import { useEffect, useState } from "react";
export const View = () => {
    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let id = params.get("id");
        fetch(`http://192.168.0.117:3001/image?id=${id}`, {
            method: "GET"
        })
            .then(res => res.json()
                .then(data => {
                    const image = document.getElementById("image");
                    console.log(JSON.stringify(data["blob"]));
                    let src = data["blob"];
                    image.src = src;
                }))
            .catch(e => {
                window.location = "/404";
            })
        window.onblur = function () {
            quit(id);
        }

        setTimeout(() => { quit(id); }, 30000);

        /*           ___    _____   ____
            |\  |   |   |     |    |
            | \ |   |   |     |    |----
            |  \|   |___|     |    |____
    
            -------------------------------------------------------
            > need to find more ways to block people from saving the image, mainly block screenshotting (PrintScreen key)
            > make sure the database doesn't get too clogged, delete images after certain time since upload
        */




        document.onkeydown = function (e) {
            if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) {
                quit(id);
            }

        }
        document.onkeyup = function (e) {
            if (e.key == "PrintScreen") {
                stopPrntScr();
                quit(id);
            }

        }

    }, [])

    function stopPrntScr() {

        var inpFld = document.createElement("input");
        inpFld.setAttribute("value", ".");
        inpFld.setAttribute("width", "0");
        inpFld.style.height = "0px";
        inpFld.style.width = "0px";
        inpFld.style.border = "0px";
        document.body.appendChild(inpFld);
        inpFld.select();
        document.execCommand("copy");
        inpFld.remove(inpFld);
    }
    function AccessClipboardData() {
        try {
            window.clipboardData.setData('text', "Access   Restricted");
        } catch (err) {
        }
    }
    setInterval(() => AccessClipboardData(), 300);

    function resizeImgDiv() {
        const imgDiv = document.getElementById("imgDiv");
        const img = document.getElementById("image");
        const divider = 1.9;
        const dividerY = divider * 0.5625;
        imgDiv.style.width = `fit-content`;
        imgDiv.style.height = `fit-content`;
        if (img.clientWidth * img.clientHeight > 1000000) {
            console.log(img.clientWidth, img.clientHeight);
            imgDiv.style.width = `${img.clientWidth / (img.clientWidth > img.clientHeight ? divider : dividerY)}px`;
            imgDiv.style.height = `${img.clientHeight / (img.clientWidth < img.clientHeight ? divider : dividerY)}px`;
            console.log("divide", imgDiv.style.width, imgDiv.style.height);

        }

    }

    function quit(id) {
        // document.body.innerHTML = "";
        // fetch(`http://localhost:3001/image?id=${id}`, {
        //     method: "DELETE"
        // });
        // window.location = "/";
    }

    function security() {

    }
    return (
        <div>
            <h1 id="header">safeshare</h1>
            <div id="imgDiv">
                <img id="image" onLoad={() => { resizeImgDiv() }}></img>
            </div>
        </div>
    )
}
