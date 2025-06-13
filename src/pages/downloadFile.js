export default function Download(){
    const uuid = location.hash.slice(11);

    window.location.href = `http://localhost:8081/download?uuid=${uuid}`;
    location.hash = '/'
}