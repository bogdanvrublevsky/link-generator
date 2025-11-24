console.debug('Strarting script loading')

function main() {
    console.debug('Strarting  main function')
    const fields = document.querySelectorAll('#utm-form input');
    const result = document.getElementById('result');
    const copyBtn = document.getElementById('copy');
    const container = document.getElementById('result-container');
    const links = document.getElementById('links');

    function buildLink() {
        // buids a link with UTM parameters
        const base = document.getElementById('base').value.trim();
        const params = [];
        ['source', 'medium', 'campaign', 'content', 'term'].forEach(key => {
            const value = document.getElementById(key).value.trim();
            if (value) params.push(`utm_${key}=${encodeURIComponent(value)}`);
        });
        const sep = !base ? '?' : base.includes('?') ? '&' : '?';
        const full = params.length ? (base || '') + sep + params.join('&') : base;
        result.textContent = full;
    }

    function createLinkElement(key, value) {
        // creates and appends a link element to the links container
        if (links.querySelector(`[data-key="${key}"]`)) return;
        const el = document.createElement("div");
        el.dataset.key = key;
        el.textContent = value;
        links.appendChild(el);
    }

    function loadLinks() {
        // loads saved links from localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key.startsWith("link-")) continue;
            const value = localStorage.getItem(key);
            createLinkElement(key, value);
        }
    }

    function saveLink(value) {
        // saves a link to localStorage and returns its key
        const key = "link-" + Date.now();
        localStorage.setItem(key, value);
        return key;
    }

    copyBtn.addEventListener('click', () => {
        // copies the generated link to clipboard and saves it
        const text = result.textContent.trim();
        if (!text) return;
        navigator.clipboard.writeText(text);
        const key = saveLink(text);
        createLinkElement(key, text);
        copyBtn.disabled = true;
        container.classList.remove('flash');
        void container.offsetWidth;
        container.classList.add('flash');
        setTimeout(() => copyBtn.disabled = false, 1000);
    });

    fields.forEach(f => f.addEventListener('input', buildLink));
    buildLink();
    loadLinks();
    console.debug('Main function finished')
}

document.addEventListener('DOMContentLoaded', main);
console.debug('Script loaded')