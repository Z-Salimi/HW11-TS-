import { RenderPagesParams } from "../types/type";

export function createPages(pageNumber: number, className: string = ""): string {
    return `<button class="px-2 bg-gray-200 rounded-3xl font-medium ${className}">${pageNumber}</button>`;
}

export function renderPages({ totalPages, page }: RenderPagesParams): string {
    let htmlPagination = "";
    for (let i = 1; i <= totalPages; i++) {
        if (i === page) {
            htmlPagination += createPages(i, "outline outline-slate-700 !bg-appBlack/20");
        } else {
            htmlPagination += createPages(i);
        }
    }
    return htmlPagination;
}
