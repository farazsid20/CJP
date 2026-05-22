const APP_KEYS = {
  theme: "cjp-theme",
  user: "cjp-user",
  poll: "cjp-poll",
  ideas: "cjp-ideas",
  forum: "cjp-forum",
  bookmarks: "cjp-bookmarks",
  comments: "cjp-comments",
  articles: "cjp-articles",
  campaigns: "cjp-campaigns",
  reports: "cjp-reports"
};

const defaults = {
  poll: {
    question: "Sabse urgent youth issue kis area mein hai?",
    options: [
      { id: "employment", label: "Employment Access", votes: 18 },
      { id: "education", label: "Education Reform", votes: 11 },
      { id: "mental-health", label: "Mental Health Support", votes: 9 },
      { id: "digital-safety", label: "Digital Safety", votes: 6 }
    ]
  },
  ideas: [
    {
      id: "idea-1",
      title: "Local skill development centers",
      problem: "Youth unemployment",
      detail: "Har district mein weekend skill labs aur placement bridge programs.",
      author: "Community Desk",
      votes: 29
    },
    {
      id: "idea-2",
      title: "Campus fee transparency board",
      problem: "High education fees",
      detail: "Semester-wise public fee audits aur digital grievance board.",
      author: "Student Volunteer",
      votes: 24
    }
  ],
  forum: [
    {
      id: "forum-1",
      topic: "Education",
      name: "Anonymous",
      message: "Career guidance school level par start honi chahiye, sirf board exams par focus nahi.",
      votes: 17
    },
    {
      id: "forum-2",
      topic: "Governance",
      name: "City Youth Group",
      message: "Citizen dashboards ko ward level tak le jana chahiye so delays trace ho saken.",
      votes: 13
    }
  ],
  comments: {
    "article-1": [
      { id: "c-1", name: "Ayesha", text: "Skill gap aur internships ko ek saath address karna zaroori hai." }
    ]
  },
  articles: [
    {
      id: "article-1",
      title: "Youth Employment Reality Check",
      category: "Employment",
      summary: "Unemployment, experience barrier, aur local skill pipelines ke beech ka gap decode kiya gaya hai.",
      readTime: "5 min read"
    },
    {
      id: "article-2",
      title: "Why Public Dashboards Matter",
      category: "Governance",
      summary: "Administrative delay aur opaque systems ko reduce karne ke practical civic models.",
      readTime: "4 min read"
    },
    {
      id: "article-3",
      title: "Mental Health Is A Public Issue",
      category: "Health",
      summary: "Career anxiety, peer pressure aur digital burnout ke against youth-first support ideas.",
      readTime: "6 min read"
    }
  ],
  campaigns: [
    {
      id: "campaign-1",
      title: "Fee Transparency Week",
      summary: "Students ko college fee structures aur grievance channels samjhane wala awareness drive."
    },
    {
      id: "campaign-2",
      title: "Report Recruitment Bias",
      summary: "Employment irregularities ke anonymous reporting aur accountability resources."
    }
  ],
  reports: []
};

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getPoll() {
  const data = readStore(APP_KEYS.poll, null);
  if (data) return data;
  writeStore(APP_KEYS.poll, defaults.poll);
  return defaults.poll;
}

function getIdeas() {
  const data = readStore(APP_KEYS.ideas, null);
  if (data) return data;
  writeStore(APP_KEYS.ideas, defaults.ideas);
  return defaults.ideas;
}

function getForumPosts() {
  const data = readStore(APP_KEYS.forum, null);
  if (data) return data;
  writeStore(APP_KEYS.forum, defaults.forum);
  return defaults.forum;
}

function getComments() {
  const data = readStore(APP_KEYS.comments, null);
  if (data) return data;
  writeStore(APP_KEYS.comments, defaults.comments);
  return defaults.comments;
}

function getArticles() {
  const data = readStore(APP_KEYS.articles, null);
  if (data) return data;
  writeStore(APP_KEYS.articles, defaults.articles);
  return defaults.articles;
}

function getCampaigns() {
  const data = readStore(APP_KEYS.campaigns, null);
  if (data) return data;
  writeStore(APP_KEYS.campaigns, defaults.campaigns);
  return defaults.campaigns;
}

function getReports() {
  const data = readStore(APP_KEYS.reports, null);
  if (data) return data;
  writeStore(APP_KEYS.reports, defaults.reports);
  return defaults.reports;
}

function getBookmarks() {
  return readStore(APP_KEYS.bookmarks, []);
}

function setNotice(message, scope = document) {
  const node = scope.querySelector("[data-notice]");
  if (!node) return;
  node.textContent = message;
  node.classList.remove("hidden");
}

function applyTheme() {
  const theme = localStorage.getItem(APP_KEYS.theme) || "dark";
  document.body.classList.toggle("light-mode", theme === "light");
  document.querySelectorAll("[data-theme-label]").forEach((node) => {
    node.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
  });
}

function initThemeToggle() {
  applyTheme();
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = document.body.classList.contains("light-mode") ? "dark" : "light";
      localStorage.setItem(APP_KEYS.theme, next);
      applyTheme();
    });
  });
}

function initMobileNav() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function updateAuthUI() {
  const user = readStore(APP_KEYS.user, null);
  document.querySelectorAll("[data-user-state]").forEach((node) => {
    node.textContent = user ? `Logged in: ${user.name}` : "Guest mode";
  });
  document.querySelectorAll("[data-auth-btn]").forEach((button) => {
    button.textContent = user ? "Logout" : "Login / Signup";
  });
}

function initAuth() {
  const modal = document.querySelector("[data-auth-modal]");
  const reportModal = document.querySelector("[data-report-modal]");

  document.querySelectorAll("[data-open-auth]").forEach((button) => {
    button.addEventListener("click", () => {
      const user = readStore(APP_KEYS.user, null);
      if (user) {
        localStorage.removeItem(APP_KEYS.user);
        updateAuthUI();
        return;
      }
      modal?.classList.add("open");
    });
  });

  document.querySelectorAll("[data-open-report]").forEach((button) => {
    button.addEventListener("click", () => reportModal?.classList.add("open"));
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".modal")?.classList.remove("open");
    });
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.remove("open");
  });

  reportModal?.addEventListener("click", (event) => {
    if (event.target === reportModal) reportModal.classList.remove("open");
  });

  const authForm = document.querySelector("[data-auth-form]");
  authForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(authForm);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    if (!name || !email) return;
    writeStore(APP_KEYS.user, { name, email });
    updateAuthUI();
    authForm.reset();
    modal?.classList.remove("open");
  });

  const reportForm = document.querySelector("[data-report-form]");
  reportForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(reportForm);
    const reports = getReports();
    reports.unshift({
      id: `report-${Date.now()}`,
      title: formData.get("title"),
      area: formData.get("area"),
      detail: formData.get("detail")
    });
    writeStore(APP_KEYS.reports, reports);
    reportForm.reset();
    reportModal?.classList.remove("open");
    setNotice("Issue report save ho gaya. Admin panel se review kiya ja sakta hai.");
  });

  updateAuthUI();
}

function renderPoll() {
  const poll = getPoll();
  document.querySelectorAll("[data-poll-question]").forEach((node) => {
    node.textContent = poll.question;
  });
  document.querySelectorAll("[data-poll-options]").forEach((container) => {
    container.innerHTML = "";
    const total = poll.options.reduce((sum, option) => sum + option.votes, 0);
    poll.options.forEach((option) => {
      const percent = total ? Math.round((option.votes / total) * 100) : 0;
      const wrapper = document.createElement("div");
      wrapper.className = "poll-option";
      wrapper.innerHTML = `
        <div>
          <strong>${option.label}</strong>
          <div class="tiny">${option.votes} votes</div>
          <div class="progress-bar"><span style="width:${percent}%"></span></div>
        </div>
        <button type="button" data-vote-id="${option.id}">Vote</button>
      `;
      container.appendChild(wrapper);
    });
  });

  document.querySelectorAll("[data-vote-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const pollData = getPoll();
      const choice = pollData.options.find((option) => option.id === button.dataset.voteId);
      if (!choice) return;
      choice.votes += 1;
      writeStore(APP_KEYS.poll, pollData);
      renderPoll();
      renderAdmin();
      setNotice(`Vote registered for ${choice.label}.`);
    });
  });
}

function renderIdeas() {
  const items = [...getIdeas()].sort((a, b) => b.votes - a.votes);
  document.querySelectorAll("[data-idea-list]").forEach((container) => {
    container.innerHTML = "";
    items.forEach((idea) => {
      const node = document.createElement("div");
      node.className = "leaderboard-item";
      node.innerHTML = `
        <strong>${idea.title}</strong>
        <span class="tiny">${idea.problem} · ${idea.author}</span>
        <span>${idea.detail}</span>
        <div class="meta-row">
          <span class="tag">${idea.votes} votes</span>
          <button class="pill-btn" type="button" data-idea-vote="${idea.id}">Support</button>
        </div>
      `;
      container.appendChild(node);
    });
  });

  document.querySelectorAll("[data-idea-vote]").forEach((button) => {
    button.addEventListener("click", () => {
      const items = getIdeas();
      const idea = items.find((entry) => entry.id === button.dataset.ideaVote);
      if (!idea) return;
      idea.votes += 1;
      writeStore(APP_KEYS.ideas, items);
      renderIdeas();
      renderAdmin();
    });
  });
}

function initIdeaForm() {
  const form = document.querySelector("[data-idea-form]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const user = readStore(APP_KEYS.user, null);
    const ideas = getIdeas();
    ideas.push({
      id: `idea-${Date.now()}`,
      title: formData.get("title"),
      problem: formData.get("problem"),
      detail: formData.get("detail"),
      author: user?.name || "Anonymous Youth",
      votes: 1
    });
    writeStore(APP_KEYS.ideas, ideas);
    form.reset();
    renderIdeas();
    renderAdmin();
    setNotice("Naya solution leaderboard mein add ho gaya.", form.closest(".form-card") || document);
  });
}

function renderForum() {
  const posts = [...getForumPosts()].sort((a, b) => b.votes - a.votes);
  document.querySelectorAll("[data-forum-feed]").forEach((container) => {
    container.innerHTML = "";
    posts.forEach((post) => {
      const node = document.createElement("article");
      node.className = "forum-post";
      node.innerHTML = `
        <strong>${post.topic}</strong>
        <span class="tiny">Posted by ${post.name}</span>
        <span>${post.message}</span>
        <div class="meta-row">
          <span class="tag">${post.votes} votes</span>
          <button type="button" class="pill-btn" data-forum-vote="${post.id}">Upvote</button>
        </div>
      `;
      container.appendChild(node);
    });
  });

  document.querySelectorAll("[data-forum-vote]").forEach((button) => {
    button.addEventListener("click", () => {
      const posts = getForumPosts();
      const post = posts.find((entry) => entry.id === button.dataset.forumVote);
      if (!post) return;
      post.votes += 1;
      writeStore(APP_KEYS.forum, posts);
      renderForum();
      renderAdmin();
    });
  });
}

function initForumForm() {
  const form = document.querySelector("[data-forum-form]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const posts = getForumPosts();
    posts.unshift({
      id: `forum-${Date.now()}`,
      topic: data.get("topic"),
      name: data.get("name") || "Anonymous",
      message: data.get("message"),
      votes: 1
    });
    writeStore(APP_KEYS.forum, posts);
    form.reset();
    renderForum();
    renderAdmin();
    setNotice("Discussion board par post share ho gayi.", form.closest(".forum-card") || document);
  });
}

function toggleBookmark(item) {
  const bookmarks = getBookmarks();
  const exists = bookmarks.find((entry) => entry.id === item.id);
  const next = exists ? bookmarks.filter((entry) => entry.id !== item.id) : [item, ...bookmarks];
  writeStore(APP_KEYS.bookmarks, next);
  renderBookmarks();
  syncBookmarkButtons();
}

function syncBookmarkButtons() {
  const bookmarks = getBookmarks();
  document.querySelectorAll("[data-bookmark-id]").forEach((button) => {
    const saved = bookmarks.some((entry) => entry.id === button.dataset.bookmarkId);
    button.textContent = saved ? "Bookmarked" : "Bookmark";
  });
}

function renderBookmarks() {
  const bookmarks = getBookmarks();
  document.querySelectorAll("[data-bookmark-list]").forEach((container) => {
    container.innerHTML = "";
    if (!bookmarks.length) {
      container.innerHTML = `<div class="bookmark-item"><strong>No bookmarks yet</strong><span class="tiny">News aur issue cards ko bookmark karke yahan save karein.</span></div>`;
      return;
    }
    bookmarks.forEach((item) => {
      const node = document.createElement("div");
      node.className = "bookmark-item";
      node.innerHTML = `<strong>${item.title}</strong><span class="tiny">${item.type}</span><span>${item.summary}</span>`;
      container.appendChild(node);
    });
  });
}

function initShareAndBookmark() {
  document.querySelectorAll("[data-bookmark-id]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      toggleBookmark({
        id: button.dataset.bookmarkId,
        title: button.dataset.bookmarkTitle,
        summary: button.dataset.bookmarkSummary,
        type: button.dataset.bookmarkType
      });
    });
  });

  document.querySelectorAll("[data-share-title]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", async () => {
      const payload = {
        title: button.dataset.shareTitle,
        text: button.dataset.shareText,
        url: window.location.href
      };
      try {
        if (navigator.share) {
          await navigator.share(payload);
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(`${payload.title} - ${payload.url}`);
          setNotice("Link clipboard par copy ho gaya.");
        }
      } catch (error) {
        setNotice("Share action cancel ho gayi ya available nahi thi.");
      }
    });
  });

  syncBookmarkButtons();
  renderBookmarks();
}

function renderArticles() {
  const articles = getArticles();
  document.querySelectorAll("[data-article-feed]").forEach((container) => {
    container.innerHTML = "";
    articles.forEach((article) => {
      const node = document.createElement("article");
      node.className = "article-card";
      node.innerHTML = `
        <span class="tag">${article.category}</span>
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <div class="card-actions">
          <span class="tiny">${article.readTime}</span>
          <button class="pill-btn" type="button" data-bookmark-id="${article.id}" data-bookmark-title="${article.title}" data-bookmark-summary="${article.summary}" data-bookmark-type="Article">Bookmark</button>
          <button class="pill-btn" type="button" data-share-title="${article.title}" data-share-text="${article.summary}">Share</button>
        </div>
        <div class="comment-list" data-comments-for="${article.id}"></div>
        <form data-comment-form="${article.id}">
          <label>
            <span>Add comment</span>
            <textarea name="text" placeholder="Constructive feedback ya observation"></textarea>
          </label>
          <button class="primary-btn" type="submit">Post Comment</button>
        </form>
      `;
      container.appendChild(node);
    });
  });
  initShareAndBookmark();
  renderComments();
}

function renderComments() {
  const comments = getComments();
  document.querySelectorAll("[data-comments-for]").forEach((container) => {
    const articleId = container.dataset.commentsFor;
    const items = comments[articleId] || [];
    container.innerHTML = items.length
      ? items.map((item) => `<div class="comment-item"><strong>${item.name}</strong><span>${item.text}</span></div>`).join("")
      : `<div class="comment-item"><strong>No comments yet</strong><span class="tiny">Discussion shuru karein.</span></div>`;
  });

  document.querySelectorAll("[data-comment-form]").forEach((form) => {
    if (form.dataset.bound === "true") return;
    form.dataset.bound = "true";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const articleId = form.dataset.commentForm;
      const data = new FormData(form);
      const text = data.get("text")?.toString().trim();
      if (!text) return;
      const user = readStore(APP_KEYS.user, null);
      const comments = getComments();
      comments[articleId] = comments[articleId] || [];
      comments[articleId].unshift({
        id: `comment-${Date.now()}`,
        name: user?.name || "Anonymous",
        text
      });
      writeStore(APP_KEYS.comments, comments);
      form.reset();
      renderComments();
      renderAdmin();
    });
  });
}

function renderCampaigns() {
  const campaigns = getCampaigns();
  document.querySelectorAll("[data-campaign-list]").forEach((container) => {
    container.innerHTML = "";
    campaigns.forEach((campaign) => {
      const node = document.createElement("div");
      node.className = "campaign-item";
      node.innerHTML = `<strong>${campaign.title}</strong><span>${campaign.summary}</span>`;
      container.appendChild(node);
    });
  });
}

function renderAdmin() {
  const analytics = {
    pollVotes: getPoll().options.reduce((sum, option) => sum + option.votes, 0),
    ideas: getIdeas().length,
    posts: getForumPosts().length,
    comments: Object.values(getComments()).flat().length,
    reports: getReports().length,
    bookmarks: getBookmarks().length
  };

  document.querySelectorAll("[data-analytics]").forEach((container) => {
    container.innerHTML = `
      <div class="stat-card"><strong>${analytics.pollVotes}</strong><span>Total Poll Votes</span></div>
      <div class="stat-card"><strong>${analytics.ideas}</strong><span>Solutions Submitted</span></div>
      <div class="stat-card"><strong>${analytics.posts}</strong><span>Forum Posts</span></div>
      <div class="stat-card"><strong>${analytics.comments}</strong><span>Comments</span></div>
      <div class="stat-card"><strong>${analytics.reports}</strong><span>Issue Reports</span></div>
      <div class="stat-card"><strong>${analytics.bookmarks}</strong><span>Bookmarks</span></div>
    `;
  });

  document.querySelectorAll("[data-admin-articles]").forEach((container) => {
    const articles = getArticles();
    container.innerHTML = articles.map((article) => `
      <div class="article-item">
        <strong>${article.title}</strong>
        <span class="tiny">${article.category} · ${article.readTime}</span>
        <span>${article.summary}</span>
      </div>
    `).join("");
  });

  document.querySelectorAll("[data-admin-campaigns]").forEach((container) => {
    const campaigns = getCampaigns();
    container.innerHTML = campaigns.map((campaign) => `
      <div class="campaign-item">
        <strong>${campaign.title}</strong>
        <span>${campaign.summary}</span>
      </div>
    `).join("");
  });

  document.querySelectorAll("[data-admin-comments]").forEach((container) => {
    const comments = Object.entries(getComments()).flatMap(([articleId, items]) =>
      items.map((item) => ({ ...item, articleId }))
    );
    container.innerHTML = comments.length
      ? comments.map((item) => `
          <div class="comment-item">
            <strong>${item.name}</strong>
            <span class="tiny">${item.articleId}</span>
            <span>${item.text}</span>
            <button class="pill-btn" type="button" data-remove-comment="${item.id}">Remove</button>
          </div>
        `).join("")
      : `<div class="comment-item"><strong>No comments to moderate</strong></div>`;
  });

  document.querySelectorAll("[data-admin-reports]").forEach((container) => {
    const reports = getReports();
    container.innerHTML = reports.length
      ? reports.map((item) => `
          <div class="list-row">
            <strong>${item.title}</strong>
            <span class="tiny">${item.area}</span>
            <span>${item.detail}</span>
          </div>
        `).join("")
      : `<div class="list-row"><strong>No reports submitted yet</strong></div>`;
  });

  document.querySelectorAll("[data-remove-comment]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.removeComment;
      const comments = getComments();
      Object.keys(comments).forEach((articleId) => {
        comments[articleId] = comments[articleId].filter((item) => item.id !== target);
      });
      writeStore(APP_KEYS.comments, comments);
      renderComments();
      renderAdmin();
    });
  });
}

function initAdminForms() {
  const articleForm = document.querySelector("[data-article-form]");
  articleForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(articleForm);
    const articles = getArticles();
    articles.unshift({
      id: `article-${Date.now()}`,
      title: data.get("title"),
      category: data.get("category"),
      summary: data.get("summary"),
      readTime: data.get("readTime") || "4 min read"
    });
    writeStore(APP_KEYS.articles, articles);
    articleForm.reset();
    renderArticles();
    renderAdmin();
    setNotice("Article admin queue aur news feed mein add ho gaya.", articleForm.closest(".admin-card") || document);
  });

  const campaignForm = document.querySelector("[data-campaign-form]");
  campaignForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(campaignForm);
    const campaigns = getCampaigns();
    campaigns.unshift({
      id: `campaign-${Date.now()}`,
      title: data.get("title"),
      summary: data.get("summary")
    });
    writeStore(APP_KEYS.campaigns, campaigns);
    campaignForm.reset();
    renderCampaigns();
    renderAdmin();
    setNotice("Awareness campaign list update ho gayi.", campaignForm.closest(".admin-card") || document);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initAuth();
  renderPoll();
  renderIdeas();
  initIdeaForm();
  renderForum();
  initForumForm();
  renderArticles();
  renderCampaigns();
  initShareAndBookmark();
  renderAdmin();
  initAdminForms();
});
