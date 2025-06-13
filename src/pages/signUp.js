export default function SignUp() {

    setTimeout(() => {
        document.getElementById('signup').addEventListener('click', async (e) => {
            e.preventDefault();
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const passwordConf = document.getElementById('password-confirm').value;

            if (password !== passwordConf) {
                document.getElementById('error').innerText = "Пароли должны совпадать";
            } else {
                const hash = await hashPassword(password);
                await fetch("http://localhost:8081/sign-up", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: login,
                        passwordHash: hash
                    }),
                    mode: 'cors'
                }
                ).then(response => {
                    if (response.status === 200) {
                        location.hash = '#/'
                    } else {
                        document.getElementById("error").innerText = "Ошибка";

                    }
                })
            }
        })
    }, 0);

    return `
        <h1>Регистрация</h1>
        <div id="error" class="error"></div> 
        <form>
            <input type="text" id="login" placeholder="Логин" class="signup-form" requered/>
            <input type="password" id="password" placeholder="Пароль" class="signup-form" requered/>
            <input type="password" id="password-confirm" placeholder="Подтверждение пароля" class="signup-form" requered/>
            <button type="submit" id="signup">Зарегистрироваться</button>
        </form>
    `;

}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}