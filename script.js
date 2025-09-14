
/* Add copy buttons to every .code-box and provide robust copy (clipboard API + fallback) */
document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.code-box').forEach(box => {
                const pre = box.querySelector('pre');
                if (!pre) return;

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'copy-btn';
                btn.setAttribute('aria-label', 'Copy code to clipboard');
                btn.innerText = 'Copy';
                box.appendChild(btn);

                btn.addEventListener('click', async () => {
                    const text = pre.innerText;
                    try {
                        // Preferred modern API (requires secure context: https or localhost)
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            await navigator.clipboard.writeText(text);
                        } else {
                            // Fallback for older browsers
                            const ta = document.createElement('textarea');
                            ta.value = text;
                            ta.setAttribute('readonly', '');
                            ta.style.position = 'fixed';      // avoid scrolling to bottom
                            ta.style.left = '-9999px';
                            document.body.appendChild(ta);
                            ta.select();
                            const ok = document.execCommand('copy');
                            document.body.removeChild(ta);
                            if (!ok) throw new Error('Fallback: execCommand failed');
                        }

                        // UI feedback
                        btn.innerText = 'Copied!';
                        btn.classList.add('copied');
                        setTimeout(() => { btn.innerText = 'Copy'; btn.classList.remove('copied'); }, 1500);
                    } catch (err) {
                        console.error('Copy failed:', err);
                        // If writeText is blocked by permission or not allowed (or fallback fails)
                        btn.innerText = 'Press Ctrl+C';
                        setTimeout(() => btn.innerText = 'Copy', 1800);
                    }
                });
            });
});

