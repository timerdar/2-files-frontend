export default function SignUp(){

    setTimeout(() => {
        document.getElementById('signup').addEventListener('click', () => {
            location.hash = '/'
        })
    }, 0);

    return `
        <h1>Регистрация</h1>
        <form>
            <input type="text" id="login" class="signup-form"/>
            <input type="text" id="password" class="signup-form"/>
            <input type="text" id="password-confirm" class="signup-form"/>
            <button type="submit" id="signup">Зарегистрироваться</button>
        </form>
    `;

}