
const url = "http://localhost:5000/api/posts";

const postList = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const btnSubmit = document.querySelector(".btn");

let output = "";

const renderPosts = (posts) => {
  posts.forEach((post) => {
    output += `
    <div class="card mt-4 col-md-6 bg-light">
      <div class="card-body" data-id=${post._id}>
        <h4 class="card-title">${post.title}</h4>
        <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
        <p class="card-text">${post.body}</p>
        <a href="#" class="card-link" id="edit-post">Edit</a>
        <a href="#" class="card-link" id="delete-post">Delete</a>
      </div>
    </div>
    `;
  });
  postList.innerHTML = output;
};

//GET METHOD
fetch(url)
  .then(res => res.json())
  .then(data => renderPosts(data));

//UPDATE AND DELETE METHOD
postList.addEventListener("click", (e) => {
  e.preventDefault();

  let delButtonIsPressed = e.target.id == "delete-post";
  let editButtonIsPressed = e.target.id == "edit-post";

  let id = e.target.parentElement.dataset.id;

  //DELETE 
  if (delButtonIsPressed) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => location.reload());
  }

  if (editButtonIsPressed) {
    const parent = e.target.parentElement;
    let titleContent = parent.querySelector(".card-title").textContent;
    let bodyContent = parent.querySelector(".card-text").textContent
    
    titleValue.value = titleContent;
    bodyValue.value = bodyContent;
  }

  //UPDATE
  btnSubmit.addEventListener("click", (e) => {
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: titleValue.value,
        body: bodyValue.value,
      })
    })
      .then(res => res.json())
      .then(() => location.reload())
  })
});



// POST METHOD
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value
    })
  })
    .then(res => res.json())
    .then(data => {
      const dataArr = [];
      dataArr.push(data);
      renderPosts(dataArr);
    })

    titleValue.value = "";
    bodyValue.value = "";
});




