export default function Upload() {

    setTimeout(() => {
        document.getElementById("upload").addEventListener('click', async (e) => {
            e.preventDefault();
            document.getElementById("progressBar").value = 0;
            const file = document.getElementById("file").files[0];
            if (!file) document.getElementById("error").innerText = 'Выберите файл';

            const login = localStorage.getItem("login");
            const passwordHash = localStorage.getItem("passwordHash");

            const authResponse = await fetch("http://localhost:8081/auth", {
                method: 'POST',
                mode: "cors",
                body: JSON.stringify({
                    login: login,
                    passwordHash: passwordHash
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (authResponse.status === 200) {
                const userId = localStorage.getItem("userId");
                const fileName = document.getElementById("fileName").value;

                const xhr = new XMLHttpRequest();
                xhr.open("POST", `http://localhost:8081/upload?userId=${userId}&fileName=${fileName}`);

                xhr.setRequestHeader("Content-Type", "application/octet-stream");

                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable) {
                        const percent = (event.loaded / event.total) * 100;
                        document.getElementById("progressBar").value = percent;
                    }
                });

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const uuid = JSON.parse(xhr.responseText).uuid;
                        document.getElementById("downloadLink").innerHTML = `
                        Файл загружен
                        <button id="copyButt">Скопировать ссылку на файл</button>`;
                        document.getElementById("copyButt").addEventListener("click", (event) => {
                            event.preventDefault();
                            navigator.clipboard.writeText(`http://localhost:3000/#/download/${uuid}`);
                            location.hash = "#/menu";
                        })
                    } else {
                        console.log(xhr.responseText);
                    }
                };

                xhr.send(file);


            } else if (authResponse.status === 401) {
                document.getElementById("error").innerText = "Неправильный логин или пароль";
            } else {
                document.getElementById("error").innerText = authResponse.json().error;
            }

        })
    }, 0)

    return `
        <h1>Загрузка файла</h1>
        <div id="error" class="error"></div>
        <form>
            <input type="text" id="fileName" name="fileName" placeholder="Название файла" required/>
            <input type="file" id="file" name="file" required/>
            <button id="upload" type="submit">Загрузить файл</button>
            <progress id="progressBar" value="0" max="100"></progress>
        </form>
        <div id="downloadLink"></div>
    `;

}