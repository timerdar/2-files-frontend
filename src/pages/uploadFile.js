export default function Upload(){

    return `
        <h1>Загрузка файла</h1>
        <form>
            <input type="file" id="file" name="file" required/>
            <button type="submit">Загрузить файл</button>
        </form>
    `;

}