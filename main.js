document.addEventListener("DOMContentLoaded", () => {
    const packsGrid = document.querySelector(".packs-grid");
    if (packsGrid) {
        const packCards = Array.from(packsGrid.children);
        let currentStartIndex = 0;

        const renderCarousel = () => {
            const currentCards = Array.from(packsGrid.children);

            currentCards[0].style.opacity = '0';
            currentCards[0].style.transform = 'translateX(-20px)';

            setTimeout(() => {
                packsGrid.innerHTML = "";

                for (let i = 0; i < 3; i++) {
                    const index = (currentStartIndex + i) % packCards.length;
                    const pack = packCards[index].cloneNode(true);

                    pack.addEventListener("click", () => {
                        window.location.href = "shop.html?filter=packs";
                    });
                    pack.style.cursor = "pointer";
                    pack.style.transition = 'all 0.3s ease';
                    pack.style.opacity = '0';
                    pack.style.transform = 'translateX(20px)';

                    packsGrid.appendChild(pack);

                    setTimeout(() => {
                        pack.style.opacity = '1';
                        pack.style.transform = 'translateX(0)';
                    }, i * 100);
                }
            }, 300);
        };

        const moveRight = () => {
            currentStartIndex = (currentStartIndex + 1) % packCards.length;
            renderCarousel();
        };

        const moveLeft = () => {
            currentStartIndex = (currentStartIndex - 1 + packCards.length) % packCards.length;
            renderCarousel();
        };

        const rightBtn = document.querySelector(".arrow-btn.right");
        const leftBtn = document.querySelector(".arrow-btn.left");

        if (rightBtn) rightBtn.addEventListener("click", moveRight);
        if (leftBtn) leftBtn.addEventListener("click", moveLeft);

        renderCarousel();
    }

    const coffeeTypes = document.querySelectorAll(".coffee-type");

    coffeeTypes.forEach((type) => {
        const overlay = document.createElement("div");
        overlay.className = "hover-overlay";
        overlay.innerHTML = `
            <div class="glow-effect"></div>
            <span class="shop-text">Click to shop</span>
        `;
        type.appendChild(overlay);

        type.addEventListener("mousemove", function (e) {
            const rect = type.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            type.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        type.addEventListener("mouseleave", function () {
            type.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
            overlay.style.opacity = "0";
        });

        type.addEventListener("mouseenter", function () {
            overlay.style.opacity = "1";
        });

        type.addEventListener("click", function () {
            type.style.transform = "scale(0.95)";
            setTimeout(() => {
                type.style.transform = "scale(1)";
                const productType = type.querySelector("p").textContent.toLowerCase().trim();
                window.location.href = `shop.html?filter=${productType.replace(/\s+/g, '')}`;
            }, 150);
        });
    });

    if (window.location.pathname.includes("shop.html")) {
        const filterOptions = document.querySelectorAll(".filter-option");
        const productCards = document.querySelectorAll(".product-card");
        const modal = document.querySelector('.product-modal');
        const modalImage = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalOffer = modal.querySelector('.modal-offer');
        const modalDescription = modal.querySelector('.product-description');
        const closeBtn = modal.querySelector('.close-modal');

        function applyFilter(filterType) {
            productCards.forEach((card) => {
                const productTitle = card.querySelector("h3").textContent.toLowerCase().trim();
                let shouldShow = false;

                switch (filterType.toLowerCase()) {
                    case "shopall":
                        shouldShow = true;
                        break;
                    case "capsules":
                        shouldShow = productTitle.includes("capsule");
                        break;
                    case "coffeebeans":
                        shouldShow = productTitle.includes("bean");
                        break;
                    case "groundcoffee":
                        shouldShow = productTitle.includes("ground");
                        break;
                    case "packs":
                        shouldShow = productTitle.includes("pack");
                        break;
                    default:
                        shouldShow = true;
                }

                card.style.display = shouldShow ? "block" : "none";
            });

            filterOptions.forEach((option) => {
                const optionType = option.querySelector("p").textContent.toLowerCase().trim().replace(/\s+/g, '');
                if (optionType === filterType.toLowerCase()) {
                    option.classList.add("active");
                } else {
                    option.classList.remove("active");
                }
            });
        }

        filterOptions.forEach((option) => {
            option.addEventListener("click", function() {
                const filterType = this.querySelector("p").textContent.trim().replace(/\s+/g, '');
                applyFilter(filterType);
            });
        });

        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get("filter");

        if (filterParam) {
            applyFilter(filterParam);
        } else {
            applyFilter("shopall");
        }

        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const productTitle = card.querySelector('h3').textContent;
                const productImage = card.querySelector('img').src;
                const hasOffer = card.querySelector('.offer-tag') !== null;

                modalImage.src = productImage;
                modalImage.alt = productTitle;
                modalTitle.textContent = productTitle;
                modalDescription.textContent = `Experience the finest quality coffee with our ${productTitle.toLowerCase()}. Perfect for coffee enthusiasts who appreciate exceptional taste.`;

                if (hasOffer) {
                    modalOffer.style.display = 'flex';  
                    modalOffer.textContent = '3x2';    
                } else {
                    modalOffer.style.display = 'none';
                }

                modal.style.display = 'flex';
                modal.style.top = '50%';
                modal.style.left = '50%';
                modal.style.transform = 'translate(-50%, -50%)';
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    const offerTags = document.querySelectorAll('.offer-tag');
    offerTags.forEach(tag => {
        tag.style.padding = '5px 10px';
        tag.style.borderRadius = '5px';
        tag.style.fontSize = '14px';
    });
});
