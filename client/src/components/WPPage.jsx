import React, { useEffect, useState } from "react";

const WPPage = ({ slug }) => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`https://dev-webgame-p25.pantheonsite.io/wp-json/wp/v2/pages?slug=${slug}`)
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
        <main style={{ padding: "2rem" }}>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <>
                    <h1 dangerouslySetInnerHTML={{ __html: title }} />
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </>
            )}
        </main>
    );
};

export default WPPage;
