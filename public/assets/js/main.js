window.onload = function () {
    location.hash = '';
}

window.onscroll = function () {
    let scrollPosition = window.pageYOffset
    if (scrollPosition > 50) {
        document.getElementById('nav').classList.add('elevated');
    }
    else {
        if (document.getElementById('nav').classList.length > 0) {
            document.getElementById('nav').classList.remove('elevated');
        }
    }
}

const faders = document.querySelectorAll('.fadeIn');

const appearOptions = { threshold: 0.5 }

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    })
}, appearOptions)

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})

const blogs = [
    // { id: 1, title: 'blog1', link: 'blog1', src: 'assets/images/1.png' },
    // { id: 2, title: 'blog2', link: 'blog2', src: 'assets/images/2.png' },
    // { id: 3, title: 'blog3', link: 'blog3', src: 'assets/images/1.png' },
    // { id: 4, title: 'blog4', link: 'blog4', src: 'assets/images/2.png' },
    // { id: 5, title: 'blog5', link: 'blog5', src: 'assets/images/1.png' }
]
let blogSection = ''
for (let i = 0; i < blogs.length; i++) {
    blogSection += `
    <div class="col m4 s12">
        <div class="blog-item">
            <img width="100%" src="${blogs[i].src}" alt="">
            <h2 onclick="window.location='/public/blog.html?${blogs[i].link}'">${blogs[i].title}</h2>
        </div>
    </div>`
}

const blogItem = document.getElementById('blogItems');
blogItem.innerHTML = blogSection;
if (blogs.length == 0) {
    document.getElementById('blogs').setAttribute('style', 'display:none')
}


let modalOpen = false;
const overlay = document.getElementById('overlay');
const body = document.getElementsByTagName('body')[0];
let toggleModal = function (id) {
    const modalId = document.getElementById(id);
    if (modalOpen == true) {
        modalId.removeAttribute('style');
        overlay.removeAttribute('style');
        body.removeAttribute('style');

    } else {
        modalId.setAttribute('style', 'opacity:1;transform: translate(-50%,-50%) scale(1);')
        overlay.setAttribute('style', 'opacity:1;z-index:999')
        body.setAttribute('style', 'overflow:hidden')
    }
    modalOpen = !modalOpen;
}

document.getElementById('submitContact').addEventListener('click', (e) => {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    if (!name || name == '' || name == undefined) {
        console.log(name);
        toggleToast('Enter your name', false);
        return false;
    }
    if (!email || email == '' || email == undefined) {
        toggleToast('Enter your email', false);
        return false;
    }
    if (!message || message == '' || message == undefined) {
        toggleToast('Enter your message', false);
        return false;
    }
    toggleToast('Message Sent !', true);
    toggleModal('contactModal');
})
toggleToast = function (message, type) {
    document.getElementById('toastMessage').textContent = message;
    if (type) {
        document.getElementById('toastMessage').setAttribute('style', 'display:block; background:#41764F');
    } else {
        document.getElementById('toastMessage').setAttribute('style', 'display:block; background:#D92121');
    }
    setTimeout(function () { document.getElementById('toastMessage').removeAttribute('style'); }, 2000);
}
