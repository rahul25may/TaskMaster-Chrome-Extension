function getAndUpdate() {
    console.log("Updating List...");
    tit = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();
}
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // Populate the Table
    tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row" class="gap-col-1">${index + 1}</th>
            <td class="gap-col">${element[0]}</td>
            <td class="gap-col">${element[1]}</td>
            <td class="gap-col"><button class="btn btn-sm btn-primary" id="delButton">Delete</button></td>
            </tr>   
            `
    });
    tableBody.innerHTML = str;
}

document.getElementById("add").addEventListener("click", getAndUpdate);
update();

document.getElementById("clear").addEventListener("click", clearStorage);
function clearStorage() {
    if (confirm("Do you really want to clear all?")) {
        console.log("clearing the storage");
        localStorage.clear();
        update();
    }
}

document.getElementById('delButton').addEventListener('click', deletedG);

function deletedG(itemIndex) {
    console.log("Deleted", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //DEleteing the element
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}