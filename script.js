// Function to get data from localStorage
function getData() {
    return JSON.parse(localStorage.getItem("inventory")) || [];
}

// Function to set data to localStorage
function setData(data) {
    localStorage.setItem("inventory", JSON.stringify(data));
}

// Function to add new data
function addData(event) {
    event.preventDefault();
    let data = getData();
    let newData = {
        id: Date.now(),
        nama: document.getElementById("nama").value,
        kategori: document.getElementById("kategori").value,
        harga: document.getElementById("harga").value,
        stok: document.getElementById("stok").value,
        deskripsi: document.getElementById("deskripsi").value,
    };

    data.push(newData);
    setData(data);
    alert("Data berhasil ditambahkan!");
    window.location.href = "admin.html";
}

// Function to read data and display it
function readData() {
    let data = getData();
    let dataList = document.getElementById("dataList");
    dataList.innerHTML = "";
    data.forEach((item, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>
                <a href="ubah.html?id=${item.id}">edit</a> |
                <button onclick="deleteData(${item.id})">delete</button>
            </td>
            <td>${item.nama}</td>
            <td>${item.kategori}</td>
            <td>${item.harga}</td>
            <td>${item.stok}</td>
            <td>${item.deskripsi}</td>
        </tr>`;
        dataList.innerHTML += row;
    });
}

// Function to delete data
function deleteData(id) {
    let data = getData();
    let filteredData = data.filter(item => item.id != id);
    setData(filteredData);
    alert("Data berhasil dihapus!");
    readData();
}

// Function to update data
function updateData(event) {
    event.preventDefault();
    let data = getData();
    let id = document.getElementById("id").value;
    let updatedData = {
        id: id,
        nama: document.getElementById("nama").value,
        kategori: document.getElementById("kategori").value,
        harga: document.getElementById("harga").value,
        stok: document.getElementById("stok").value,
        deskripsi: document.getElementById("deskripsi").value,
    };

    let index = data.findIndex(item => item.id == id);
    data[index] = updatedData;
    setData(data);
    alert("Data berhasil diubah!");
    window.location.href = "admin.html";
}

// Function to load data for editing
window.onload = function () {
    if (document.getElementById("dataList")) {
        readData();
    }

    let id = getQueryParam("id");
    if (id) {
        let data = getData();
        let item = data.find(product => product.id == id);
        if (item) {
            document.getElementById("id").value = item.id;
            document.getElementById("nama").value = item.nama;
            document.getElementById("kategori").value = item.kategori;
            document.getElementById("harga").value = item.harga;
            document.getElementById("stok").value = item.stok;
            document.getElementById("deskripsi").value = item.deskripsi;
        }
    }
};

// Function to get query parameter value by name
function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to search data by keyword
function searchData(event) {
    event.preventDefault();
    let keyword = document.getElementById("keyword").value.toLowerCase();
    let data = getData();
    let filteredData = data.filter(item =>
        item.nama.toLowerCase().includes(keyword) ||
        item.kategori.toLowerCase().includes(keyword) ||
        item.harga.toString().includes(keyword) ||
        item.stok.toString().includes(keyword) ||
        item.deskripsi.toLowerCase().includes(keyword)
    );

    let dataList = document.getElementById("dataList");
    dataList.innerHTML = "";
    filteredData.forEach((item, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>
                <a href="ubah.html?id=${item.id}">edit</a> |
                <button onclick="deleteData(${item.id})">delete</button>
            </td>
            <td>${item.nama}</td>
            <td>${item.kategori}</td>
            <td>${item.harga}</td>
            <td>${item.stok}</td>
            <td>${item.deskripsi}</td>
        </tr>`;
        dataList.innerHTML += row;
    });
}
