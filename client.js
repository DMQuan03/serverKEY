fetch("http://127.0.0.1:5678/api/v1/shopee/asd34gasd-543fdsdasdasd-650asd-asfitnnac-kouvjsklloa/", {
    method: "GET",
    headers: {
        'content-type': "application/json",
        "x_key_admin_q": "rteasd-ager34-rffd454-65422d-quan300503"
    },
    // body: JSON.stringify({
    //     social: "Shopee",
    //     key: "abagsd",
    //     expried: new Date().getTime() + 60 * 60 * 60
    // })
})
    .then(async response => console.log(await response.text()))
    .catch(err => console.error(err))