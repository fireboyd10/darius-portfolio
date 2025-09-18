import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer(){
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(( ) => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        })
    }, [])

    function goTop(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return(
        <footer class="py-5 my-5 bg-dark text-white">
            <Container fluid className="px-4">
                <div className="copyright"> Copyright &copy;2025 Darius </div>
                <div className="socials"> 
                    <ul className="social-list">
                        <li>
                            <a href="https://www.instagram.com/darius_anc/">
                            <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/darius.aniculaesei">
                            <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/darius-stefan-aniculaesei-437896282/">
                            <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </li>
                    </ul>
                </div>
                {
                    showTopBtn && (
                        <div className="go-top" onClick={goTop}>
                            <button className="arrow-button"></button>
                        </div>
                    ) 
                }
            </Container>
        </footer>
    )
}