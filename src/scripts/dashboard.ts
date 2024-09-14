import { AxiosError } from "axios";
import { getBrands, getSneakers } from "../apis/services/sneaker.service";
import { getUserInfo } from "../apis/services/user.service";
import { createAnyBrands } from "../components/brands";
import { createPages } from "../components/page";
import { chooseSneaker, createAnySneakerCard } from "../components/sneakers.card";
import { errorHandler } from "../libs/error-handler";
import { removeSessionToken } from "../libs/session-manager";
import { toast } from "../libs/toast";
import { ErrorResponseData } from "../types/type";
// import debounce from "debounce";

const userName = document.getElementById("userName") as HTMLElement;
const timeW = document.getElementById("timeW") as HTMLElement;
const brands = document.getElementById("brands") as HTMLElement;
const allSneakers = document.getElementById("allSneakers") as HTMLElement;
const pages = document.getElementById("pages") as HTMLElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const logout = document.getElementById("logout") as HTMLElement;
let Brand: string;

// ======================== get User Name and show brands and time welcome ====================
async function init(): Promise<void> {
  try {
    const response = await getUserInfo();
    userName.innerText = response.username;
    timeWelcome();
    showBrands();
    setSneakers();
  } catch (error) {
    errorHandler(error as AxiosError<ErrorResponseData>);
  }
}

// ======================== set time for welcome in header ====================
function timeWelcome(): void {
  let hour = new Date().getHours();
  console.log(hour);
  
  if (hour < 12 && hour > 3) {
    timeW.innerText = "Good Morning";
  } else if (hour < 18 && hour > 12) {
    timeW.innerText = "Good Evening";
  } else {
    timeW.innerText = "Good Night";
  }
}

// ======================== show brands ====================
async function showBrands(choose: string = "All"): Promise<void> {
  let allBrands = await getBrands();
  allBrands.splice(0, 0, "All");
  brands.innerHTML = allBrands
    .map((item: string) => {
      if (item === choose) {
        return createAnyBrands(item, "text-white bg-[#343A40]");
      } else {
        return createAnyBrands(item);
      }
    })
    .join("");
}

// ======================== Show SneakerCards and Pagination ====================
function render({ data, totalPages, page }: { data: any[]; totalPages: number; page: number }): void {
  let html = "";
  data.map((item: any) => {
    html += createAnySneakerCard(item);
  });
  allSneakers.innerHTML = html;
  html = "";
  for (let i = 1; i <= totalPages; i++) {
    if (i === page) {
      html += createPages(i, "!bg-gray-600 text-white");
    } else {
      html += createPages(i);
    }
  }
  chooseSneaker();
  pages.innerHTML = html;
}

// ======================== get and show Sneakers(set) ====================
async function setSneakers(page: number = 1, cb?: () => void, brand?: string): Promise<void> {
  try {
    let sneakers;
    if (cb) {
      await cb();
    }
    if (brand) {
      Brand = brand;
      if (brand === "All") brand = "";
      sneakers = await getSneakers({ page: page, limit: 10, brands: brand });
    } else {
      sneakers = await getSneakers({ page: page, limit: 10 });
    }
    render(sneakers);
  } catch (error) {
    errorHandler(error as AxiosError<ErrorResponseData>);
  }
}

// ======================= find Sneakers by Id =======================
function find(event: Event): void {
  let parent = event.target as HTMLElement;
  while (!parent.dataset.id) {
    parent = parent.parentElement as HTMLElement;
  }
  window.location.href = `/sneaker?id=${parent.dataset.id}`;
}

// ===================== logOut button ====================
logout.addEventListener("click", (): void => {
  removeSessionToken();
  toast("Logged out", "success");
  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);
});

// ======================== Search input ================
searchInput.addEventListener("input", (event: Event): void => {
  const query = (event.target as HTMLInputElement).value;
  if (query.length > 1) {
    window.location.href = `/search?search=${query}`;
  }
});

// ++======================= click button =======================++

//================== filter by Brands ================
brands.addEventListener("click", (event: Event): void => {
  setSneakers(1, undefined, (event.target as HTMLElement).innerText);
  showBrands((event.target as HTMLElement).innerText);
});

//============== filter by pages=================
pages.addEventListener("click", (event: Event): void => {
  setSneakers(parseInt((event.target as HTMLElement).innerText), undefined, Brand);
});

//========== find sneaker by id ===========
allSneakers.addEventListener("click", find);

// ============================ call user and sneakers ================================
init();
