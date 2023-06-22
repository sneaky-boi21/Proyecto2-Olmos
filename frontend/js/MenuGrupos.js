window.onload = init;
function init() {
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "login.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', signin);
};