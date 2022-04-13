import css from './GetStatus.module.css';

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}


const GetStatus = () => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let rawByteString;

    fetch("https://normative-control.herokuapp.com/api/load-result?id=09f4fe82-f8b2-49bb-bdc4-eb03462d61ec", requestOptions)
        .then(response => response.json())
        .then(result => {
            let file_content = result['file'];

            // Decode the String
            // var file_content = _base64ToArrayBuffer(file_content_base64);
            console.log(file_content);

            // console.log(file_content);
            console.log(hexToBytes(file_content));
            let resultBytes = hexToBytes(file_content);
            let byteArray = new Uint8Array(resultBytes);
            console.log(byteArray);
            var a = window.document.createElement('a');
            //
            a.href = window.URL.createObjectURL(new Blob([byteArray], {type: 'application/octet-stream'}));
            a.download = 'abobus-bebrus.docx';

            // Append anchor to body.
            document.body.appendChild(a)
            a.click();

            // Remove anchor from body
            document.body.removeChild(a)

        })
        .catch(error => console.log('error', error));

    return (
        <div className={css.get_status}>
            Get Status
        </div>
    );
};

export default GetStatus;