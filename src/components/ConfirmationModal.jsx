import { useEffect } from "react"

export default function ConfirmationModal({modalData}){

    useEffect(() => {
        document.body.style.overflowY = "hidden";
         
        return () => {
            document.body.style.overflowY = "scroll";
        };
    },[])

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <div  className="modal-text">
                    <h2>{modalData.text1}</h2>
                    <p>{modalData.text2}</p>
                </div>
                <div className="modal-buttons">
                    <button onClick={modalData.btn1Handler} className="modal-button-1">{modalData.btn1Text}</button>
                    <button onClick={modalData.btn2Handler} className="modal-button-2">{modalData.btn2Text}</button>
                </div>
            </div>
        </div>
    )
}