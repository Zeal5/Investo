import React from "react";

function DownloadButton({ page, onDownloadData, disable }, ref) {
  function getData() {
    console.log(`http://127.0.0.1:8000/download/${page}`);
    fetch(`http://127.0.0.1:8000/download/${page}`)
      .then((response) => response.json())
      .then((data) => {
        onDownloadData(data); 
      })
      .catch((error) => console.log(error));
  }

  if (ref) {
    ref.current = {getData}; 
  }

  return (
    <button ref={ref} onClick={ref?.current?.getData} className='download-button' disabled={disable}>
      Download
    </button>
  );
}
export default React.forwardRef(DownloadButton)