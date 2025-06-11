export default function Download(){

    const fileId = location.hash.slice(11)

    return `
        <h1>${fileId}</h1>
    `
};