console.debug('Strarting script loading')
// todo
// basic fields validation
// 'add/remove field' functionality
// recent links list via local storage or cookies 
function main() {
    console.debug('Strarting  main function')
    const fields = document.querySelectorAll('#utm-form input');
    const result = document.getElementById('result');
    const copyBtn = document.getElementById('copy');
    const container = document.getElementById('result-container');

    function buildLink() {
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

    fields.forEach(f => f.addEventListener('input', buildLink));

    copyBtn.addEventListener('click', () => {
        const text = result.textContent.trim();
        if (!text) return;
        navigator.clipboard.writeText(text);
        copyBtn.disabled = true;
        container.classList.remove('flash');
        void container.offsetWidth; // перезапуск анимации
        container.classList.add('flash');
        setTimeout(() => copyBtn.disabled = false, 1000);
    });

    buildLink();
    console.debug('Main function finished')
}

document.addEventListener('DOMContentLoaded', main);
console.debug('Script loaded')