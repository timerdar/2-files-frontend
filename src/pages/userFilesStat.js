export default function UserStat() {

    var docsStat = [];

    setTimeout(() => {
        fetch("http://localhost:8081/docs",
            {
                method: "POST",
                body: JSON.stringify({
                    login: localStorage.getItem("login"),
                    passwordHash: localStorage.getItem("passwordHash")
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(
            response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(
                docsStat => {
                    console.log(docsStat);
                    const ul = document.getElementById("list");
                    docsStat.forEach(element => {
                        const li = document.createElement('li');
                        li.innerHTML = `<a href="http://localhost:3000/#/download/${element.uuid}">Файл ${element.name}</a> | Загрузок (${element.count})`;
                        ul.appendChild(li);
                    }
                    )
                });
    }, 0)

    return `
        <h1>Статистика</h1>
        <ul id="list">

        </ul>        `;

}