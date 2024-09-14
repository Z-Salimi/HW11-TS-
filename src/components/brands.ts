export function createAnyBrands(brandName: string, className: string = ""): string {
    return `<button
            class="text-[16px] font-semibold whitespace-nowrap rounded-[25px] border-[2px] border-app-boeder-brand py-[5px] px-[20px] ${className}"
          >
          ${brandName}
          </button>`;
}
