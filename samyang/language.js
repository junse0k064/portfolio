document.querySelectorAll(".language-dropdown").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".language");
    const menu = dropdown.querySelector(".language-menu");
    const label = toggle.querySelector("span");
    const options = Array.from(menu.querySelectorAll('[role="option"]'));
    let closeTimer;

    const closeMenu = (returnFocus = false) => {
        clearTimeout(closeTimer);
        toggle.setAttribute("aria-expanded", "false");
        dropdown.classList.remove("is-open");
        if (!menu.hidden) {
            closeTimer = setTimeout(() => {
                if (toggle.getAttribute("aria-expanded") === "false") menu.hidden = true;
            }, 220);
        }
        if (returnFocus) toggle.focus();
    };

    const openMenu = (last = false) => {
        clearTimeout(closeTimer);
        menu.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        dropdown.classList.remove("is-open");
        requestAnimationFrame(() => dropdown.classList.add("is-open"));
        const selectedIndex = options.findIndex((option) => option.dataset.language === label.textContent);
        options[last ? options.length - 1 : Math.max(selectedIndex, 0)].focus();
    };

    const selectLanguage = (option) => {
        label.textContent = option.dataset.language;
        options.forEach((item) => {
            item.setAttribute("aria-selected", String(item === option));
        });
        closeMenu(true);
    };

    toggle.addEventListener("click", () => {
        if (menu.hidden) openMenu();
        else closeMenu();
    });

    toggle.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu();
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            openMenu(true);
        }
    });

    menu.addEventListener("click", (event) => {
        const option = event.target.closest('[role="option"]');
        if (option) selectLanguage(option);
    });

    menu.addEventListener("keydown", (event) => {
        const currentIndex = options.indexOf(document.activeElement);
        let nextIndex = currentIndex;

        if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % options.length;
        else if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + options.length) % options.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = options.length - 1;
        else if (event.key === "Escape") {
            event.preventDefault();
            closeMenu(true);
            return;
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectLanguage(options[currentIndex]);
            return;
        } else {
            return;
        }

        event.preventDefault();
        options[nextIndex].focus();
    });

    dropdown.addEventListener("focusout", (event) => {
        if (!dropdown.contains(event.relatedTarget)) closeMenu();
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) closeMenu();
    });
});
