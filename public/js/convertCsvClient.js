
const btnDownload = document.getElementById("btnDownloadCSV");

btnDownload.addEventListener("click", () => {
    // Get CSV data from the button's data-csv attribute
    const csvData = btnDownload.getAttribute("data-csv");
    downloadCSV("Progress.csv", csvData);
});

function downloadCSV(filename, csvData) {
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/csv;charset=utf-8,${csvData}`);
    element.setAttribute("download", filename);

    document.body.appendChild(element);
    element.click();
    // document.body.removeChild(element); 
}