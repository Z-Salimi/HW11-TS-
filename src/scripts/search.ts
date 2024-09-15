import { chooseSneaker, renderList } from "../components/sneakers.card";
import { getSneakers } from "../apis/services/sneaker.service";
import { renderPages } from "../components/page";
import { errorHandler } from "../libs/error-handler";
import { AxiosError } from "axios";
import { ErrorResponseData, SneakerParams } from "../types/type";
import { debounce } from 'lodash';

const mainSearch = document.getElementById("mainSearch") as HTMLElement;
let searchQuery: string | null;

//==================== Search input =====================
const searchInput = document.getElementById("search") as HTMLInputElement;
searchInput.addEventListener("input", debounce((event: Event) => {
  const query = (event.target as HTMLInputElement).value;
  if (query.length > 1) {
    window.location.href = `/search?search=${query}`;
  }
}, 3000));

//================ Create query ===================
export function Query(query?: string | null): void {
  try {
    if (!query) {
      query = new URLSearchParams(window.location.search).get('search');
    }
    searchQuery = query;
    setSneakers(query);
  } catch (error) {
    return errorHandler(error as AxiosError<ErrorResponseData>);
  }
}

//===================== set and show sneakers ======================= 
async function setSneakers(query: string | null, page: number = 1): Promise<void> {
  try {
    const response = await getSneakers({ page, limit: 10, search: query }as SneakerParams);
    mainSearch.innerHTML = createSearch(response, query);
    if(searchQuery){
        chooseSneaker(searchQuery);
    }    
    setupPagination(response.totalPages, page);
  } catch (error) {
    return errorHandler(error as AxiosError<ErrorResponseData>);
  }
}

// ============================== create back button and headers ===============
function createSearch(response: any, search: string | null): string {
    return `
      <a class="top-2 left-4 z-10 inline-block absolute" href="/dashboard">
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
      </a>
      <div class="grid gap-y-6 w-full pt-6">
        
        <div class="text-xl font-bold flex justify-between mb-5 ">
          <h2 class="overflow-hidden text-nowrap overflow-ellipsis">Results for ${search}</h2>
          <p class="text-base font-bold shrink-0 pl-4">${response.total} found</p>
        </div>
      </div>
      ${response.data.length ? renderListPage(response) : mainSearch.innerHTML = notFound()}
    `;
  }

// ================================ pages not found ======================
function notFound(): string {
  return `
    <div class="flex flex-col justify-center items-center gap-y-10 mt-24">
      <img src="img/Screenshot (254).png" alt="">
      <div class="flex flex-col gap-y-4 items-center">
        <h2 class="font-bold text-xl text-app-grey">Not Found</h2>
        <p class="px-6 text-center text-app-boeder-brand">Sorry, the keyword you entered cannot be found. Please check again or search with another keyword.</p>
      </div>
    </div>
  `;
}

// ================ create sneakers and pagination ====================
function renderListPage(response: any): string {
  const listSneaker = renderList(response.data);
  const pagination = renderPages(response);
  return Sneakers(listSneaker, pagination);
}

// ====================create sneakers card ==================
function Sneakers(listSneaker: string, pagination: string): string {
  return `
    <div class="grid gap-y-7 mb-6">
      <!-- sneakers list -->
      <div id="allSneakers" class="grid grid-cols-2 gap-x-4 gap-y-8  mb-[25px]">
        ${listSneaker}
      </div>

      <div class="flex gap-x-3 justify-center mb-[70px]" id="pages">
         ${pagination}
        </div>
    </div>
  `;
}

function setupPagination(totalPages: number, currentPage: number): void {
  const pagesContainer = document.getElementById("pages");
  if (!pagesContainer) return;

  pagesContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i.toString();
    pageButton.classList.add("pagination-button");
    pageButton.classList.add("px-2", "bg-gray-200" , "rounded-3xl" , "font-medium");
    if (i === currentPage) {
      pageButton.classList.add("active");
      pageButton.classList.add("!bg-gray-600" , "text-white");
    }

    pageButton.addEventListener("click", () => setSneakers(searchQuery, i));
    pagesContainer.appendChild(pageButton);
  }
}


// =================== call function ===================
if (window.location.pathname === "/search") {
  Query();
}
