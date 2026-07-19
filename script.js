

const menuToggle = document.querySelector('.menu-toggle');
const mobileSidebar = document.querySelector('#mobileSidebar');
const sidebarBackdrop = document.querySelector('#mobileSidebarBackdrop');
const closeSidebarButton = document.querySelector('.close-sidebar');

function toggleSidebar(open) {
    mobileSidebar.classList.toggle('open', open);
    sidebarBackdrop.classList.toggle('show', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    mobileSidebar?.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
}

menuToggle?.addEventListener('click', () => {
    const isOpen = mobileSidebar?.classList.contains('open');
    toggleSidebar(!isOpen);
});

closeSidebarButton?.addEventListener('click', () => toggleSidebar(false));
sidebarBackdrop?.addEventListener('click', () => toggleSidebar(false));

window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
        toggleSidebar(false);
    }
});
