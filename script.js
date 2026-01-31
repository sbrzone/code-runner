// Syntax Highlighting Logic
function updateHighlight(type) {
    const input = document.getElementById(`input-${type}`);
    const output = document.querySelector(`#view-${type} code`);
    let code = input.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    code = code.replace(/(&lt;[a-z0-9!/]+)/gi, '<span class="token-tag">$1</span>');
    code = code.replace(/("[^"]*")/g, '<span class="token-string">$1</span>');
    code = code.replace(/\b(var|let|const|function|body|color|background|if|else|return)\b/g, '<span class="token-keyword">$1</span>');
    
    output.innerHTML = code + "\n";
}

// Sync Scrolling
function syncScroll(type) {
    const input = document.getElementById(`input-${type}`);
    const view = document.getElementById(`view-${type}`);
    view.scrollTop = input.scrollTop;
    view.scrollLeft = input.scrollLeft;
}

// Fixed Export Function for Android
function triggerDownload(textareaId, fileName) {
    const content = document.getElementById(textareaId).value;
    if (!content.trim()) {
        alert("Please write some code first!");
        return;
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

// Run Code Logic
function runCode() {
    const html = document.getElementById('input-html').value;
    const css = document.getElementById('input-css').value;
    const js = document.getElementById('input-js').value;
    const frame = document.getElementById('output-frame');
    
    const combined = `
        <html>
            <head><style>${css}</style></head>
            <body>
                ${html}
                <script>${js}<\/script>
            </body>
        </html>
    `;
    
    document.getElementById('preview-modal').style.display = 'block';
    const doc = frame.contentDocument || frame.contentWindow.document;
    doc.open();
    doc.write(combined);
    doc.close();
}

function closePreview() {
    document.getElementById('preview-modal').style.display = 'none';
}
