// load all blogs
document.addEventListener("DOMContentLoaded", () => {
  loadBlogs();

  // Dropdown menu functionality
  const moreButtons = document.querySelectorAll('.more-button');
  console.log("more-button: ", moreButtons)
  let activeDropdown = null;

  moreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = button.querySelector('.dropdown-menu');
      
      if (activeDropdown && activeDropdown !== dropdown) {
        activeDropdown.classList.remove('show');
      }
      
      dropdown.classList.toggle('show');
      activeDropdown = dropdown;
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    if (activeDropdown) {
      activeDropdown.classList.remove('show');
      activeDropdown = null;
    }
  });

  // Handle dropdown item clicks
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = e.currentTarget.textContent.trim();
      const blog = e.currentTarget.closest('.blog');
      const title = blog.querySelector('.blog-title').textContent;

      switch (action) {
        case 'View Blog':
          console.log(`Viewing blog: ${title}`);
          break;
        case 'Edit':
          console.log(`Editing blog: ${title}`);
          break;
        // case 'Delete':
        //   if (confirm(`Are you sure you want to delete "${title}"?`)) {
        //     console.log(`Deleting blog: ${title}`);
        //     // blog.remove();
        //     deleteBlog(id)
        //   }
          break;
      }

      if (activeDropdown) {
        activeDropdown.classList.remove('show');
        activeDropdown = null;
      }
    });
  });

})

// Tab switching
const tabButtons = document.querySelectorAll('.tab-button');
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute("data-tab");
    loadBlogs(filter);
  });
});

// Search functionality
const searchToggle = document.getElementById('searchToggle');
const searchInputContainer = document.getElementById('searchInputContainer');
const closeSearch = document.getElementById('closeSearch');
const tabButtonsContainer = document.querySelector('.tab-buttons');

function showSearch() {
  searchToggle.style.display = 'none';
  searchInputContainer.style.display = 'block';
  tabButtonsContainer.style.display = 'none';
  searchInputContainer.querySelector('input').focus();
}

function hideSearch() {
  searchToggle.style.display = 'block';
  searchInputContainer.style.display = 'none';
  tabButtonsContainer.style.display = 'flex';
}

searchToggle.addEventListener('click', showSearch);
closeSearch.addEventListener('click', hideSearch);

function showBlogEditor() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("blogEditor").style.display = "block";

    // Clear previous input values when adding a new blog
    document.getElementById("blogTitle").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("blogContent").value = "";

    editingBlogId = null; // Reset editing mode
}
function loadBlogs(type) {
  type = type || 'published'
  let blogsContainer = document.getElementById("blogsContainer");
  blogsContainer.innerHTML = ""; // Clear previous blogs before loading

  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const filteredBlogs = blogs.filter(blog => {
    return type === "published" ? blog.publish : !blog.publish;
  });
  if (blogs.length === 0) {
      blogsContainer.innerHTML = 
      `<div style="margin-top: 72px;text-align: center;">
      <div id="no-published">
          <div>
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.4286 2L8.34272 13.5081C4.54519 14.829 2 18.409 2 22.4297V22.4297C2 26.5872 4.71827 30.2559 8.69561 31.4664L41.4286 41.4286" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.3801 43.6172C15.8522 43.0644 11.6426 38.4129 11.6426 32.8574H14.6426C14.6426 36.8716 17.6843 40.2327 21.6786 40.6321L24.4645 40.9107C28.1142 41.2757 30.9996 44.0172 31.6485 47.5084C31.7998 48.3229 31.1139 49.0003 30.2854 49.0003C29.457 49.0003 28.8072 48.3145 28.5686 47.5212C27.9843 45.5794 26.2779 44.107 24.166 43.8958L21.3801 43.6172Z" fill="black"></path><path d="M47 21.5C47 32.2696 44.5376 41.5 41.5 41.5C38.4624 41.5 36 32.2696 36 21.5C36 10.7304 38.4624 2 41.5 2C44.5376 2 47 10.7304 47 21.5Z" stroke="black" stroke-width="3"></path></svg>
            <p style="margin-top: 24px;font-weight: 600;font-size: 30px;">Publish your first blog</p>
          </div> 
      </div>
      </div>`;
      return;
  }

  filteredBlogs.forEach(blog => {
      let blogElement = document.createElement("div");
      blogElement.classList.add("blog");

      let shortContent = blog.content.split("\n").slice(0, 2).join(" ");

      blogElement.innerHTML = `
          <div class="blog-header" id="blog-header-${blog.id}">
              <div class="blog-date">Sep 26, 2024 at 06:56 AM</div>
              <div class="more-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                  </svg>
                  <div class="dropdown-menu">
                      <div class="dropdown-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          View Blog
                      </div>
                      <div class="dropdown-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          Edit
                      </div>
                      <div class="dropdown-item delete" onClick="deleteBlog(${blog.id})">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          Delete
                      </div>
                  </div>
              </div>
          </div>
          <h2 class="blog-title">${blog.title}</h2>
          <div class="blog-meta">
            <div class="blog-visibility" id="blog-status-${blog.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span>Public</span>
            </div>
          </div>
      `;
      blogsContainer.appendChild(blogElement);
      const publishStatus = document.getElementById(`blog-status-${blog.id}`);
      console.log("publishstatus: ", publishStatus)
      if(blog.publish) {
        publishStatus.style.visibility = "visible";
      } else {
        publishStatus.style.display = "none";
      }
      
  });
}

// blog Editor Modal - add blog js
const editorModal = document.getElementById('editorModal');
const publishButton = document.getElementById('publishButton');
const publishMenu = document.getElementById('publishMenu');
const toolbarButtons = document.querySelectorAll('.toolbar-button');
    
const openEditor = document.getElementById('openEditor');
openEditor.addEventListener('click', () => {
  editorModal.classList.add('show');
  document.body.style.overflow = 'hidden';
});

function closeEditor() {
  editorModal.classList.remove('show');
  document.body.style.overflow = '';
}

editorModal.addEventListener('click', (e) => {
  if (e.target === editorModal) {
    editorModal.classList.remove('show');
    document.body.style.overflow = '';
  }
});

publishButton.addEventListener('click', (e) => {
  e.stopPropagation();
  publishMenu.classList.toggle('show');
});

document.addEventListener('click', () => {
  publishMenu.classList.remove('show');
});

toolbarButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});


//add blog
function saveBlog(type) {
  var title = document.querySelector(".title-input").value.trim();
  var content = document.querySelector(".content-area").value.trim();
  var errorMessages = document.getElementById("errorMessages");

  errorMessages.innerHTML = ""; // Clear previous errors

  if (!title || !content) {
    if (!title) {
      errorMessages.innerHTML += "<p>Title is required.</p>";
    }
    if (!content) {
      errorMessages.innerHTML += "<p>Content is required.</p>";
    }
  }

  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  let createdAt = new Date().toLocaleDateString();
  // if (editingBlogId !== null) {
  //     // If editing, update the existing blog
  //     let blogIndex = blogs.findIndex(blog => blog.id === editingBlogId);
  //     if (blogIndex !== -1) {
  //         blogs[blogIndex] = { id: editingBlogId, title, userName, content, createdAt };
  //     }
  // } else {
      // If adding new blog
      let blogId = new Date().getTime(); // Unique ID
      blogs.push({ id: blogId, title, content, createdAt, publish: type });
  // }

  localStorage.setItem("blogs", JSON.stringify(blogs));
  loadBlogs();
  title = "";
  content = ""
  closeEditor();
}

// Function to delete a blog
function deleteBlog(id) {
  if (confirm(`Are you sure you want to delete ?`)) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs = blogs.filter(blog => blog.id !== id);

    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
  }
}