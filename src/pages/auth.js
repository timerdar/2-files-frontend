export default function Auth() {

    setTimeout(() => {
        document.getElementById("signin").addEventListener('click', async (e) => {
            e.preventDefault();
            const passwordHash = await hashPassword(document.getElementById("password").value);
            const login = document.getElementById("login").value;

            const response = await fetch("http://localhost:8081/auth", {
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
            if (response.status === 200){
                localStorage.setItem("login", login);
                localStorage.setItem("passwordHash", passwordHash);
                localStorage.setItem("userId", response.json().id);
                location.hash = '#/menu';
            }else if (response.status === 401){
                document.getElementById("error").innerText = "Неправильный логин или пароль";
            }else{
                document.getElementById("error").innerText = response.json().error;
            }

        })
    }, 0)

    return `
        <h1>Авторизация</h1>
        <div id="error" class="error"></div>
        <form id="auth-form">
            <input type="text" id="login" name="login" placeholder="Логин" class="auth-form" required>
            <input type="password" id="password" name="password" placeholder="Пароль" class="auth-form" required>
            <button type="submit" id="signin">Войти</button>
        </form>
        <a href="#/sign-up">Зарегистрироваться</a>
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