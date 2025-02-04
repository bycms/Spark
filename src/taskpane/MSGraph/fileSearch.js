let files = [];
let fileRange = document.getElementById("fileList");

async function searchFiles(query) {
  try {
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root/search(q='${query}')?select=id,name,webUrl`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.accToken}`
      }
    });
    const data = await response.json();
    files = data.value.slice(0, 3);
    showFiles(files);
  } catch (error) {
    console.error(error);
  }
}

async function getFileContent(fileid) {
  try {
    const response = await fetch(``, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.accToken}`
      }
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

function showFiles(fileArr) {
  fileRange.innerHTML = "";

  fileArr.forEach(file => {
    let name = file.name;
    let url = file.webUrl;
    let id = file.id;

    let fileDiv = document.createElement('div');
    fileDiv.className = 'drvFile';
    fileDiv.innerHTML = `<p>${name}</p><a href="${url}" target="_blank">Open</a><button class="referBtn" id="${id}">Refer</button><hr/>`;

    fileRange.appendChild(fileDiv);
    console.log("Updated files.");
  });
}

function getSubstr(str) {
  const lastSlashIndex = str.lastIndexOf('/');
  return str.substring(lastSlashIndex + 1);
}

let throttleTimeout;

document.getElementById("user-input").addEventListener('input', function() {
    if (throttleTimeout) return;

    throttleTimeout = setTimeout(() => {
        throttleTimeout = null; // Reset the timeout after 1 second

        if (this.value.lastIndexOf('/') !== -1 && window.isSignedIn) {
            document.getElementById("drvSearch").style.display = "block";
            let query = getSubstr(this.value);
            console.log("Search query is " + query);
            searchFiles(query);
            fileRange.innerHTML = "<p>Loading your files...</p>";
        }
        else {
          document.getElementById("drvSearch").style.display = "none";
        }
    }, 1500);
});

Array.from(document.getElementsByClassName("referBtn")).forEach(btn => {
  btn.addEventListener("click", function() {
    getFileContent(this.id);
  });
})