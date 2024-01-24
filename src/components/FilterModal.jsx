import { useEffect } from "react"

export default function FilterModal({modalData}){

    useEffect(() => {
        document.body.style.overflowY = "hidden";
         
        return () => {
            document.body.style.overflowY = "scroll";
        };
    },[])

    return (
        <div className="filter-wrapper">
            
        </div>
    )
}