import React from 'react'
import styles from "./About.css"

export const About = () => {
    const section1 = `So, what exactly is SafeShare? It's a groundbreaking application developed with the vision to enable
    secure image sharing among users. With SafeShare, you can confidently send images to friends, family, or colleagues,
    knowing they can only be viewed a limited number of times, and cannot be downloaded or captured in any way.`
    const section2 = `Let's take a closer look at how this app works and the benefits it offers.
    At its core, SafeShare is built on the principle of safeguarding your visual content. When you choose to 
    share an image using SafeShare, you have complete control over its accessibility. The recipient will be able to view the image,
    but only for a maximum of five times. This ensures that your images remain private and can be enjoyed by the
    intended recipient without the possibility of them being misused or shared with others.`;
    const section3 = `Unlike other image-sharing platforms, SafeShare employs sophisticated technology that actively detects any attempt to capture the image using screenshot tools. If a user tries to screenshot the image, SafeShare immediately detects it and takes action by redirecting the user to another page, prohibiting the capture of the image. This guarantees that your images are protected from unauthorized reproduction or distribution.`
    const usage1 = `Using Safeshare's interface, simply press CTRL+V to paste the image into the app. The image will be securely stored in Safeshare's database.`
    const usage2 = `After uploading your image, Safeshare will generate a unique shareable link for you. This link is what you'll use to share the image with others. Copy the link and send it to the intended recipients via email, messaging apps, or any other preferred method of communication.`
    return (
        <div>
            <h1 id="about-header" onClick={() => window.location = "/"}>safeshare</h1>
            <h1 id="subheader">about</h1>
            <div id="txt-div">
                <p>{section1}</p>
                <p>{section2}</p>
                <p>{section3}</p>
                <h1>usage</h1>
                <p>{usage1}</p>
                <p>{usage2}</p>
            </div>
        </div>
    )
}
