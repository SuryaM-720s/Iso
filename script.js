const menuItems = document.querySelectorAll(".options .option");
const energyOrb = document.querySelector(".cursor-orb");

const updateOrbPosition = (event) => {
	if (!energyOrb) return;
	const orbRect = energyOrb.getBoundingClientRect();
	const x = event.clientX - orbRect.width / 2;
	const y = event.clientY - orbRect.height / 2;
	energyOrb.style.transform = `translate(${x}px, ${y}px)`;
};

const actions = {
	"ranked": () => {
		console.log("Ranked option selected");
	},
	"leaderboard": () => {
		console.log("Leaderboard option selected");
	},
	"map": () => {
		console.log("Map option selected");
	},
	"normal": () => {
		console.log("Normal mode option selected");
	}
};

const activateItem = (item) => {
	menuItems.forEach((menuItem) => menuItem.classList.remove("is-active"));
	item.classList.add("is-active");
	if (energyOrb) {
		const index = Number(item.dataset.index ?? 0);
		const brightness = 1 + index * 0.15;
		const glow = 1 + index * 0.2;
		energyOrb.style.setProperty("--orb-brightness", String(brightness));
		energyOrb.style.setProperty("--orb-glow", String(glow));
	}

	const actionKey = item.dataset.action;
	if (actionKey && actions[actionKey]) {
		actions[actionKey]();
	}
};

menuItems.forEach((item, index) => {
	item.addEventListener("click", () => activateItem(item));
	item.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			activateItem(item);
		}
	});
	item.dataset.index = String(index);
});

const moveSelection = (direction) => {
	const currentIndex = Number(document.querySelector(".options .option.is-active")?.dataset.index ?? 0);
	let nextIndex = currentIndex;
	if (direction === "up") nextIndex = Math.max(0, currentIndex - 1);
	if (direction === "down") nextIndex = Math.min(menuItems.length - 1, currentIndex + 1);
	activateItem(menuItems[nextIndex]);
};

document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowUp") {
		event.preventDefault();
		moveSelection("up");
	}
	if (event.key === "ArrowDown") {
		event.preventDefault();
		moveSelection("down");
	}
});

document.addEventListener("mousemove", updateOrbPosition);

if (menuItems.length > 0) {
	activateItem(menuItems[0]);
}
