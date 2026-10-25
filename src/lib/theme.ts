// Theme contract (shared with the Car Market app): <html data-theme="light|dark">, preference in
// localStorage "theme" = "light" | "dark" | "system" (absent = system).
export const themeColors = { light: "#f6f6f9", dark: "#0a0a0a" } as const;

// Runs in <head> before first paint so there is no flash. Also tracks OS changes while on "system".
export const themeScript = `(function(){try{
var d=document.documentElement,m=window.matchMedia("(prefers-color-scheme: dark)"),c=${JSON.stringify(themeColors)};
function a(){var p=null;try{p=localStorage.getItem("theme")}catch(e){}
var t=p==="light"||p==="dark"?p:(m.matches?"dark":"light");
d.setAttribute("data-theme",t);
var n=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<n.length;i++)n[i].setAttribute("content",c[t])}
a();document.addEventListener("DOMContentLoaded",a);m.addEventListener("change",a)}catch(e){}})();`;
