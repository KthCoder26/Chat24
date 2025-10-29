import { useState } from "react"
import "../MainContainer/maincontainer.css"

export function Maincontainer() {

    const [textValue, setTextValue] = useState("");
    const [outputValue, setOutputValue] = useState([]);
    const [openIntroPage, setOpenIntroPage] = useState(true);

    function displaythevalue() {
        const api_key = "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"
        const fetchdata = async () => {
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${api_key}`,
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [{ role: "user", content: textValue }],
                    }),
                })
                const data = await response.json();
                if (data.error) {
                    setOutputValue((prev) => {
                        return [
                            ...prev,
                            "Error: " + data.error.message
                        ]
                    });
                } else {
                    setOutputValue((prev) => {
                        return [
                            ...prev,
                            data.choices[0].message.content,
                        ]
                    });
                    console.log(outputValue);
                    setTextValue("");
                }
            } catch (err) {
                console.error(err);
                setOutputValue("Something went wrong");
            }
        }

        fetchdata()
    }

    return (
        <>
            {openIntroPage ? <div className="intro-page">
                <div className="intro-page-textarea-heading">
                    <textarea onChange={(e) => setTextValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                setOpenIntroPage(false);
                                displaythevalue();

                            }
                        }} ></textarea>
                    <h2>Welcome to Chat24.....</h2>
                </div>
            </div> : <div className="main-container">
                <div className="output">
                    {outputValue.map((val) => {
                        return (
                            <>
                                <h3>{val}</h3>
                                <br></br>
                            </>
                        )
                    })}
                </div>
                <div className="container-textarea" >
                    <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                displaythevalue()
                            }
                        }} ></textarea>
                </div>
            </div >}
        </>
    )
}