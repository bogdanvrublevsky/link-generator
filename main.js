function main() {
    const fields = document.querySelectorAll('#utm-form input');
    const result = document.getElementById('result');
    const copyBtn = document.getElementById('copy');
    const container = document.getElementById('result-container');

    function buildLink() {
        const base = document.getElementById('base').value.trim();
        if (!base) {
            result.textContent = '';
            return;
        }

        const params = [];
        ['source', 'medium', 'campaign', 'content', 'term'].forEach(key => {
            const value = document.getElementById(key).value.trim();
            if (value) params.push(`utm_${key}=${encodeURIComponent(value)}`);
        });

        const sep = base.includes('?') ? '&' : '?';
        const full = params.length ? base + sep + params.join('&') : base;
        result.textContent = full;
    }

    fields.forEach(f => f.addEventListener('input', buildLink));

    function flashGreen() {
        container.style.transition = 'background-color 0.5s';
        container.style.backgroundColor = '#a6f3a6';
        setTimeout(() => {
            container.style.backgroundColor = '';
        }, 500);
    }

    copyBtn.addEventListener('click', () => {
        const text = result.textContent.trim();
        if (!text) return;
        navigator.clipboard.writeText(text);
        flashGreen();
    });

    buildLink();
}

document.addEventListener('DOMContentLoaded', main);