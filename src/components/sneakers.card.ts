import { Sneaker } from "../types/type";

  
  export function createAnySneakerCard({ pid, name, imageURL, price }: Sneaker): string {
    return `
        <div data-id=${pid} class="flex flex-col gap-y-1">
              <div
                class=" flex justify-center items-center"
              >
                <img class="rounded-3xl h-[139px] w-[139px]" src="${imageURL}" alt="" />
              </div>
              <h4 class="text-[18px] px-2 font-bold truncate text-app-semiGrey">
                ${name}
              </h4>
              <p class="text-[16px] px-2 font-semibold text-app-semiGrey">$ ${price}</p>
            </div>`;
  }
  
  export function chooseSneaker(search?: string): void {
    let allSneakers = document.getElementById("allSneakers") as HTMLElement;
    allSneakers.addEventListener("click", findSneakerId);
  
    function findSneakerId(event: Event): void {
      if (event.target === event.currentTarget) return;
      let parent = event.target as HTMLElement;
      while (!parent.dataset.id) {
        parent = parent.parentElement as HTMLElement;
      }
      window.location.href = `/sneaker?id=${parent.dataset.id}${search ? "&search=" + search : ""}`;
    }
  }
  
  export function renderList(data: Sneaker[]): string {
    let list = "";
    data.forEach((item) => {
      list += createAnySneakerCard(item);
    });
  
    return list;
  }
  