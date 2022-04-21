var key = "563492ad6f9170000100000164a5512ef3974a25a87922c96c44367c";

var page = 2;
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var download = document.getElementsByClassName("download_btn")[0];
var search_btn = document.getElementsByClassName("search_btn")[0];
var showmore = document.getElementById("showmore");

pexels(1, "computer");

function pexels(page, search) {
  // var search = document.getElementById("input").value;
  var url =
    "https://api.pexels.com/v1/search?query=" +
    search +
    "&page=" +
    page.toString() +
    "&per_page=20";
  var headers = new Headers();
  headers.append("Authorization", key);
  var req = new Request(url, { headers: headers });
  var fReq = fetch(req).then((res) => res.json());
  fReq.then((json) => {
    // console.log("json", json);
    var photos = json.photos;
    // console.log("photos", photos);
    photos.forEach((image) => {
      const photo = document.createElement("div");
      photo.innerHTML = `<img id="image" src=${image.src.large}>`;
      document.querySelector(".display_images").appendChild(photo);
    });
  });
}

function forceDownload(url, fileName) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var tag = document.createElement("a");
    tag.href = imageUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
}

document.querySelector(".display_images").addEventListener("click", (e) => {
  // console.log("e : ", e);
  // console.log(e.target.src);
  if (e.target.src) {
    modal.style.display = "block";
    document.getElementById("img01").src = e.target.src;
  }
  download.onclick = function () {
    forceDownload(e.target.src, "image.jpg");
  };
});

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function clearGallery() {
  document.querySelector(".display_images").innerHTML = "";
};

function showMoreImages() {
  if (document.getElementById("input").value != "") {
    nextPage = page++;
    // clearGallery();
    pexels(nextPage, document.getElementById("input").value);
  } else {
    return;
  }
};

search_btn.onclick = function () {
  if (document.getElementById("input").value != "") {
    clearGallery();
    pexels(1, document.getElementById("input").value);
  } else {
    return;
  }
};

showmore.onclick = function () {
  // console.log("page = ", page);
  showMoreImages();
};
