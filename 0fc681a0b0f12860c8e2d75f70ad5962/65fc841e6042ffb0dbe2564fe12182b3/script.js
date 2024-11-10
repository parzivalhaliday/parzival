
(async function mango() {
    const mangoEl = document.createElement("div");
    let mangoPosX,
        mangoPosY,
        mousePosX = 0,
        mousePosY = 0,
        frameCount = 0,
        idleTime = 0,
        idleAnimation = null,
        idleAnimationFrame = 0,
        forceSleep = false,
        grabbing = false,
        grabStop = true,
        nudge = false,
        parzimango = false,
        variant = "classic";

    function parseLocalStorage(key, fallback) {
        try {
            const value = JSON.parse(localStorage.getItem(`mango:${key}`));
            console.log(key, value);
            return typeof value === typeof fallback ? value : fallback;
        } catch (e) {
            console.error(e);
            return fallback;
        }
    }

    function getRandomPosition() {
        const x = Math.floor(Math.random() * (window.innerWidth - 32)) + 16;
        const y = Math.floor(Math.random() * (window.innerHeight - 32)) + 16;
        return { x, y };
    }

    const mangoSpeed = 10,
        variants = [
            ["classic", "Classic"],
            ["dog", "Dog"],
            ["tora", "Tora"],
            ["maia", "Maia (maia.crimew.gay)"],
            ["vaporwave", "Vaporwave (nya.rest)"],
        ],
        spriteSets = {
            idle: [[-3, -3]],
            alert: [[-7, -3]],
            scratchSelf: [
                [-5, 0],
                [-6, 0],
                [-7, 0],
            ],
            scratchWallN: [
                [0, 0],
                [0, -1],
            ],
            scratchWallS: [
                [-7, -1],
                [-6, -2],
            ],
            scratchWallE: [
                [-2, -2],
                [-2, -3],
            ],
            scratchWallW: [
                [-4, 0],
                [-4, -1],
            ],
            tired: [[-3, -2]],
            sleeping: [
                [-2, 0],
                [-2, -1],
            ],
            N: [
                [-1, -2],
                [-1, -3],
            ],
            NE: [
                [0, -2],
                [0, -3],
            ],
            E: [
                [-3, 0],
                [-3, -1],
            ],
            SE: [
                [-5, -1],
                [-5, -2],
            ],
            S: [
                [-6, -3],
                [-7, -2],
            ],
            SW: [
                [-5, -3],
                [-6, -1],
            ],
            W: [
                [-4, -2],
                [-4, -3],
            ],
            NW: [
                [-1, 0],
                [-1, -1],
            ],
        },
        keys = Object.keys(spriteSets).filter((key) => spriteSets[key].length > 1),
        usedKeys = new Set();

    function create() {
        variant = parseLocalStorage("variant", "classic");
        parzimango = parseLocalStorage("parzimango", false);

        if (!variants.some((v) => v[0] === variant)) {
            variant = "maia";
        }

        const initialPosition = getRandomPosition();
        mangoPosX = initialPosition.x;
        mangoPosY = initialPosition.y;

        mangoEl.id = "mango";
        mangoEl.style.width = "32px";
        mangoEl.style.height = "32px";
        mangoEl.style.position = "fixed";
        mangoEl.style.backgroundImage = `url('mango.gif')`;
        mangoEl.style.imageRendering = "pixelated";
        mangoEl.style.left = `${mangoPosX - 16}px`;
        mangoEl.style.top = `${mangoPosY - 16}px`;
        mangoEl.style.filter = parzimango ? "invert(100%)" : "none";
        mangoEl.style.zIndex = "99";

        document.body.appendChild(mangoEl);

        window.addEventListener("mousemove", (e) => {
            if (forceSleep) return;

            mousePosX = e.clientX;
            mousePosY = e.clientY;
        });

        window.addEventListener("resize", () => {
            if (!forceSleep) return;
            // If mango is outside the window and is forced to sleep, wake her up
            if (
                mangoPosX - window.innerWidth > 32 ||
                mangoPosY - window.innerHeight > 32 ||
                // Also when she is about to go outside the window
                mousePosX - window.innerWidth > 32 ||
                mousePosY - window.innerHeight > 32
            ) {
                forceSleep = false;
                resetIdleAnimation();
            }
        });

        // Handle dragging of the cat
        mangoEl.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            grabbing = true;
            let startX = e.clientX;
            let startY = e.clientY;
            let startmangoX = mangoPosX;
            let startmangoY = mangoPosY;
            let grabInterval;

            const mousemove = (e) => {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                const absDeltaX = Math.abs(deltaX);
                const absDeltaY = Math.abs(deltaY);

                // Scratch in the opposite direction of the drag
                if (absDeltaX > absDeltaY && absDeltaX > 10) {
                    setSprite(deltaX > 0 ? "scratchWallW" : "scratchWallE", frameCount);
                } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
                    setSprite(deltaY > 0 ? "scratchWallN" : "scratchWallS", frameCount);
                }

                if (
                    grabStop ||
                    absDeltaX > 10 ||
                    absDeltaY > 10 ||
                    Math.sqrt(deltaX ** 2 + deltaY ** 2) > 10
                ) {
                    grabStop = false;
                    clearTimeout(grabInterval);
                    grabInterval = setTimeout(() => {
                        grabStop = true;
                        nudge = false;
                        startX = e.clientX;
                        startY = e.clientY;
                        startmangoX = mangoPosX;
                        startmangoY = mangoPosY;
                    }, 150);
                }

                mangoPosX = startmangoX + e.clientX - startX;
                mangoPosY = startmangoY + e.clientY - startY;
                mangoEl.style.left = `${mangoPosX - 16}px`;
                mangoEl.style.top = `${mangoPosY - 16}px`;parzimango
            };

            const mouseup = () => {
                grabbing = false;
                nudge = true;
                resetIdleAnimation();
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup);
            };

            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup);
        });

        mangoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            parzimango = !parzimango;
            localStorage.setItem("mango:parzimango", parzimango);
            mangoEl.style.filter = parzimango ? "invert(100%)" : "none";
        });

        mangoEl.addEventListener("dblclick", () => {
            forceSleep = !forceSleep;
            nudge = false;
            if (!forceSleep) {
                resetIdleAnimation();
                return;
            }
        });

        window.omangoInterval = setInterval(frame, 100);
    }

    function getSprite(name, frame) {
        return spriteSets[name][frame % spriteSets[name].length];
    }

    function setSprite(name, frame) {
        const sprite = getSprite(name, frame);
        mangoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
    }

    function idle() {
        idleTime += 1;

        // every ~ 20 seconds
        if (
            idleTime > 10 &&
            Math.floor(Math.random() * 200) == 0 &&
            idleAnimation == null
        ) {
            let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
            if (mangoPosX < 32) {
                avalibleIdleAnimations.push("scratchWallW");
            }
            if (mangoPosY < 32) {
                avalibleIdleAnimations.push("scratchWallN");
            }
            if (mangoPosX > window.innerWidth - 32) {
                avalibleIdleAnimations.push("scratchWallE");
            }
            if (mangoPosY > window.innerHeight - 32) {
                avalibleIdleAnimations.push("scratchWallS");
            }
            idleAnimation =
                avalibleIdleAnimations[
                Math.floor(Math.random() * avalibleIdleAnimations.length)
                ];
        }

        if (forceSleep) {
            avalibleIdleAnimations = ["sleeping"];
            idleAnimation = "sleeping";
        }

        switch (idleAnimation) {
            case "sleeping":
                if (idleAnimationFrame < 8 && nudge && forceSleep) {
                    setSprite("idle", 0);
                    break;
                } else if (nudge) {
                    nudge = false;
                    resetIdleAnimation();
                }
                if (idleAnimationFrame < 8) {
                    setSprite("tired", 0);
                    break;
                }
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                if (idleAnimationFrame > 192 && !forceSleep) {
                    resetIdleAnimation();
                }
                break;
            case "scratchWallN":
            case "scratchWallS":
            case "scratchWallE":
            case "scratchWallW":
            case "scratchSelf":
                setSprite(idleAnimation, idleAnimationFrame);
                if (idleAnimationFrame > 9) {
                    resetIdleAnimation();
                }
                break;
            default:
                setSprite("idle", 0);
                return;
        }
        idleAnimationFrame += 1;
    }

    function frame() {
        frameCount += 1;

        if (grabbing) {
            grabStop && setSprite("alert", 0);
            return;
        }

        const diffX = mangoPosX - mousePosX;
        const diffY = mangoPosY - mousePosY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if ((distance < mangoSpeed || distance < 48) && !forceSleep) {
            idle();
            return;
        }

        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
            setSprite("alert", 0);
            // count down after being alerted before moving
            idleTime = Math.min(idleTime, 7);
            idleTime -= 1;
            return;
        }

        direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        mangoPosX -= (diffX / distance) * mangoSpeed;
        mangoPosY -= (diffY / distance) * mangoSpeed;

        mangoPosX = Math.min(Math.max(16, mangoPosX), window.innerWidth - 16);
        mangoPosY = Math.min(Math.max(16, mangoPosY), window.innerHeight - 16);

        mangoEl.style.left = `${mangoPosX - 16}px`;
        mangoEl.style.top = `${mangoPosY - 16}px`;
    }

    create();

    function setVariant(arr) {
        console.log(arr);

        localStorage.setItem("mango:variant", `"${arr}"`);
        mangoEl.style.backgroundImage = `url('mango.gif')`;
    }
    setTimeout(() => setVariant('maia'), 5000);
})();