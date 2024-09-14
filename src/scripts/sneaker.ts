import { findSneaker } from "../apis/services/sneaker.service";
import {
  renderColors,
  renderImages,
  renderSizes,
} from "../components/sneakers.page";
import { toast } from "../libs/toast";
import { errorHandler } from "../libs/error-handler";
import { AxiosError } from "axios";
import { ErrorResponseData, SneakerP } from "../types/type";

const mainSneakerPage = document.getElementById("mainSneakerPage") as HTMLElement;
// let minusButtons = document.querySelector(".minus") as HTMLElement;
// let plusButtons = document.querySelector(".plus") as HTMLElement;
// let sumNumberElements = document.querySelector(".sum_number") as HTMLElement;
let sizeMain: string;
let colorMain: string;
// let priceG: number;

// ============================== render and create sneakers page =========================
async function renderS(pid: string): Promise<void> {
  try {
    const response = await findSneaker(pid);
    const sneakers = createSneaker(response);

    mainSneakerPage.innerHTML = sneakers;
    showSize();
    showColor();
  } catch (error) {
    errorHandler(error as AxiosError<ErrorResponseData>);
  }
}

// ======================== Create Query for page ========================
function query(pid?: string): void {
  try {
    if (!pid) {
      pid = window.location.href.split("?")[1];
      pid = pid.split("=")[1];
      pid = pid.split("&")[0];
    }
    renderS(pid);
  } catch (error) {
    toast("Sneaker Can Not Found");
  }
}

// ==================== show and render size and color =========================
function showSize(): void {
  const sizes = document.getElementById("sizes") as HTMLElement;
  sizes.addEventListener("click", (event: Event) => {
    if (event.target === event.currentTarget) return;
    sizes.innerHTML = renderSizes(sizeMain, (event.target as HTMLElement).innerText);
  });
}

function showColor(): void {
  const colors = document.getElementById("colors") as HTMLElement;
  colors.addEventListener("click", (event: Event) => {
    if (event.target === event.currentTarget) return;
    colors.innerHTML = renderColors(
      colorMain,
      (event.target as HTMLElement).style.backgroundColor
    );
  });
}
// =============================== create Sneaker page =============================

  
  
function createSneaker({ name, imageURL, colors, sizes, price }: SneakerP): string {
    sizeMain = sizes;
    colorMain = colors;
    // priceG = price;
  
    return ` <!-- ======================================= headers ====================================== -->
     <a class="top-2 left-4 z-10 inline-block absolute" href="/dashboard">    
      <button class="absolute top-4" id="goBackButton2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.9998 16.0003C23.9998 16.2655 23.8945 16.5199 23.7069 16.7074C23.5194 16.8949 23.2651 17.0003 22.9998 17.0003H11.4138L15.7078 21.2923C15.8008 21.3853 15.8746 21.4956 15.9249 21.6171C15.9752 21.7386 16.0011 21.8688 16.0011 22.0003C16.0011 22.1318 15.9752 22.262 15.9249 22.3835C15.8746 22.5049 15.8008 22.6153 15.7078 22.7083C15.6149 22.8013 15.5045 22.875 15.383 22.9253C15.2615 22.9757 15.1313 23.0015 14.9998 23.0015C14.8683 23.0015 14.7381 22.9757 14.6167 22.9253C14.4952 22.875 14.3848 22.8013 14.2918 22.7083L8.29183 16.7083C8.19871 16.6154 8.12482 16.505 8.07441 16.3836C8.024 16.2621 7.99805 16.1318 7.99805 16.0003C7.99805 15.8688 8.024 15.7385 8.07441 15.617C8.12482 15.4955 8.19871 15.3852 8.29183 15.2923L14.2918 9.29229C14.4796 9.10451 14.7343 8.99902 14.9998 8.99902C15.2654 8.99902 15.5201 9.10451 15.7078 9.29229C15.8956 9.48006 16.0011 9.73474 16.0011 10.0003C16.0011 10.2658 15.8956 10.5205 15.7078 10.7083L11.4138 15.0003H22.9998C23.2651 15.0003 23.5194 15.1056 23.7069 15.2932C23.8945 15.4807 23.9998 15.7351 23.9998 16.0003Z"
              fill="black"
            />
          </svg>
        </button>
        </a>
  
        <section>
          ${renderImages(imageURL)}
  
          <!-- ============================ Pagination ============================ -->
          <div class="flex gap-x-3 justify-center mb-[70px]" id="pages">
            <button
              class="absolute top-[35vh] left-[49vw] px-2 py-1 bg-gray-600 rounded-3xl font-medium"
            ></button>
            <button
              class="absolute top-[35vh] left-[54vw] px-1 py-1 bg-gray-400 rounded-3xl font-medium"
            ></button>
            <button
              class="absolute top-[35vh] left-[57vw] px-1 py-1 bg-gray-400 rounded-3xl font-medium"
            ></button>
            <button
              class="absolute top-[35vh] left-[60vw] px-1 py-1 bg-gray-400 rounded-3xl font-medium"
            ></button>
          </div>
        </section>
  
        <!-- ============================ name , sold and review sneaker ============================ -->
        <section class="flex justify-between items-start px-3">
          <div class="flex flex-col gap-y-3">
            <h2 class="text-[25px] font-semibold text-app-grey">
              ${name}
            </h2>
            <div class="flex items-center gap-x-1 mb-5">
              <button class="bg-gray-200 px-2 py-2 rounded-lg text-[12px] mr-2">
                5.371 sold
              </button>
              <img src="img/Screenshot (253).png" alt="" />
              <p>4.3 (5.389 reviews)</p>
            </div>
          </div>
          <div class="mt-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_2377)">
                <path
                  d="M12 4.12201L10.9245 3.01651C8.39996 0.421512 3.77096 1.31701 2.09996 4.57951C1.31546 6.11401 1.13846 8.32951 2.57096 11.157C3.95096 13.8795 6.82196 17.1405 12 20.6925C17.178 17.1405 20.0475 13.8795 21.429 11.157C22.8615 8.32801 22.686 6.11401 21.9 4.57951C20.229 1.31701 15.6 0.420012 13.0755 3.01501L12 4.12201ZM12 22.5C-10.9995 7.30201 4.91846 -4.55999 11.736 1.71451C11.826 1.79701 11.9145 1.88251 12 1.97101C12.0846 1.88259 12.1727 1.79753 12.264 1.71601C19.08 -4.56299 34.9995 7.30051 12 22.5Z"
                  fill="#212529"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_2377">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </section>
  
        <!-- ============================ Description ============================ -->
        <section class="px-3 flex flex-col gap-y-3">
          <h4 class="text-[20px] font-semibold text-app-grey">Description</h4>
          <p class="text-[15px] text-app-grey font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam
            eum, officia nostrum quibusdam reicien
            <span class="text-app-boeder-brand font-semibold">view more..</span>
          </p>
        </section>
  
        <!-- ============================ size and color ============================ -->
        <section class="w-full px-3 flex items-center gap-5 mt-5">
          <div class="w-full flex flex-col items-start">
            <h4 class="text-[18px] font-semibold text-app-grey mb-2">Size</h4>
            <div class="flex w-[40vw] gap-2 overflow-x-scroll pb-2" id="sizes">
            ${renderSizes(sizes)}
            </div>
          </div>
  
          <div>
            <h4 class="text-[18px] font-semibold text-app-grey mb-2">Color</h4>
            <div class="flex w-[40vw] gap-2 overflow-x-scroll pb-2" id="colors">
            ${renderColors(colors)}
            </div>
          </div>
        </section>
  
        <!-- ============================ Quantity and price ============================ -->
        <section class="px-3 mt-10">
          <div class="flex items-center gap-5">
            <h4 class="text-[18px] font-semibold text-app-grey mb-2">Quantity</h4>
            <div
              class="bg-gray-200 py-2 px-8 rounded-full flex justify-start items-center gap-3" 
            >
             <button class="text-gray-500 hover:text-gray-700 minus" id="minus">-</button>
              <span class="bg-gray-200 text-gray-700 mx-3"id="quantity">0</span>
              <button class="text-gray-500 hover:text-gray-700 plus" id="plus">+</button>
            </div>
          </div>
          <div class="flex justify-between items-center mt-8">
            <div class="mt-4 flex flex-col gap-1 justify-center items-center">
              <h4 class="text-[18px] font-semibold text-app-grey">
                Total Price:
              </h4>
              <span class="text-[17px] font-semibold text-gray-900" id="totalPrice">$ ${price}</span>
            </div>
            <button class="mt-4 bg-app-grey text-white px-12 py-3 rounded-full" id="toCard">
              Add to Cart
            </button>
          </div>
        </section>`;
  }
  document.addEventListener("DOMContentLoaded", () => {
      if (window.location.pathname === "/sneaker") {
        console.log("Pathname matched: ", window.location.pathname);
        query();
      } else {
        console.log("Pathname did not match: ", window.location.pathname);
      } 
    });