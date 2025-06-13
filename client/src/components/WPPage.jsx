const WPPage = ({ slug }) => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [reloadIndex, setReloadIndex] = useState(0);

    useEffect(() => {
        fetch(`https://dev-webgame-p25.pantheonsite.io/wp-json/wp/v2/pages?slug=${slug}&_=${Date.now()}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.length > 0) {
                    setTitle(data[0].title.rendered);
                    setContent(data[0].content.rendered);
                } else {
                    setError("No page found.");
                }
            })
            .catch((err) => {
                console.error("Error fetching WordPress page:", err);
                setError("Failed to load content.");
            });
    }, [slug]);

    return (
        <>
            <main id="description">
                <section id="articles">
                    <article>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </article>
                </section>

                {slug === "description" && (
                    <aside>
                        <div>
                            <h3>Information sheet</h3>
                            <ul>
                                <li><p><strong>Donnet-Monay Mégane</strong> : Project member</p></li>
                                <li><p><strong>Sierro Eric</strong> : Project member</p></li>
                                <li><p><strong>Valentin Guiraud</strong> : Project member</p></li>
                                <li><p><strong>Rossier Marion</strong> : Project member</p></li>
                            </ul>
                        </div>
                    </aside>
                )}
            </main>

            <footer>
                <img id="logo" src={process.env.PUBLIC_URL + "/website/logo.png"} alt="logo" />
            </footer>
        </>
    );

};

import React, { useEffect, useState } from "react";

export default WPPage;
