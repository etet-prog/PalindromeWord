const input = document.getElementById("input");
const send = document.getElementById("send");
const currentStatus = document.getElementById("status");
const showResult = document.getElementById("result");

async function sendMessage() {
    const res = await fetch("http://127.0.0.1:9090/message-post", {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({"message" : input.value.trim()})
    });
    return res.json();
};

async function getStatus() {
    const res = await fetch("http://127.0.0.1:9090/status-get");
    const data = await res.json();
    currentStatus.innerHTML = `Status: <b style="color: green">${data.status}</b>`;
    return data;
};

async function getResult() {
    const res = await fetch("http://127.0.0.1:9090/result-get");
    const data = await res.json();
    showResult.innerHTML = `<b>${data.msg}</b>`;
    return await data;
}

async function run() {
    try {
        if (input.value) {
            showResult.innerHTML = "";
            currentStatus.innerHTML = `Status: <b style="color: orange">Pending</b>`;
            await sendMessage();
            await getStatus();
            getResult();
            input.value = "";
        }
    }
    catch {
        currentStatus.innerHTML = `Status: <b style="color: red">Failed</b>`;
    }
};

send.addEventListener("click", () => {
    run();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        run();
    }
})