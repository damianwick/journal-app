export default function deleteEntry(el) {
    const elToDel = el.parentElement.parentElement.parentElement; 
    elToDel.remove();
}
