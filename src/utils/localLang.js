export function getLocalLang() {
  if (localStorage["vue-todo-lang"]) {
    return localStorage.getItem("vue-todo-lang");
  } else {
    setLocalLang("en");
    return "en";
  }
}

export function setLocalLang(lang) {
  localStorage.setItem("vue-todo-lang", lang);
}
