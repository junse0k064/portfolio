
document.addEventListener("DOMContentLoaded", () => {
    const gnb = document.querySelector("header .gnb > ul");
    const dropdown = document.querySelector(".gnb-dropdown-inner");

    if (!gnb || !dropdown) return;

    const alignDropdown = () => {
        const topItems = Array.from(gnb.children);
        const subColumns = Array.from(dropdown.children);
        const dropdownRect = dropdown.getBoundingClientRect();

        topItems.forEach((item, index) => {
            const column = subColumns[index];
            if (!column) return;

            const rect = item.getBoundingClientRect();

            column.style.position = "absolute";
            column.style.left =
                `${rect.left + rect.width / 2 - dropdownRect.left}px`;
            column.style.transform = "translateX(-50%)";
            column.style.width = `${rect.width}px`;
        });
    };

    dropdown.style.position = "relative";

    alignDropdown();
    window.addEventListener("resize", alignDropdown);
});
