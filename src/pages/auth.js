export default function Auth() {

    setTimeout(() => {
        document.getElementById("signin").addEventListener('click', () => {
            location.hash = '#/menu'
        })
    }, 0)

    return `
        <h1>Авторизация</h1>
        <form id="auth-form">
            <input type="text" name="login" placeholder="Логин" class="auth-form" required>
            <input type="password" name="password" placeholder="Пароль" class="auth-form" required>
            <button type="submit" id="signin">Войти</button>
        </form>
        <a href="#/sign-up">Зарегистрироваться</a>
    `;
}