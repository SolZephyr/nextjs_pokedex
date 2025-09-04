"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination(
    { offset, limit, total, isTop = false }:
        { offset: number, limit: number, total: number, isTop?: boolean }) {

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParam = useSearchParams();
    const params = new URLSearchParams(searchParam);

    const current = Math.floor(offset / limit + 1);
    const max = Math.floor(total / limit + 1);

    function handlePaging(page: number): void {
        if (page) {
            params.set('page', page.toString());
        } else {
            params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    function handleOrder(order: string): void {
        if (order) {
            params.set('order', order);
        } else {
            params.delete('order');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="grid grid-cols-3 py-2">
            {(current > 1) ?
                <button onClick={() => handlePaging(current - 1)} className="btn-search col-span-full row-span-full justify-self-start w-[100px]">Previous</button>
                : ''
            }
            {isTop ?
                <>
                    <div className="grid grid-cols-1 col-span-full row-span-full justify-self-center items-center text-white font-bold text-xl w-[160px] border-3 border-transparent rounded-xl bg-blue-500 hover:bg-blue-100 hover:text-blue-500 hover:border-blue-500">
                        <label htmlFor="order" className="col-span-full row-span-full z-999 px-5 pointer-events-none">Order:&nbsp;</label>
                        <select name="order" id="order" onChange={(e) => handleOrder(e.target.value)} className="col-span-full row-span-full text-right border-r-[12px] border-transparent cursor-pointer">
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </>
                : ''
            }
            {/*<Loader className="animate-[spin_1s_ease-in-out_infinite] w-24 h-24 text-blue-800" />*/}
            {(current < max) ?
                <button onClick={() => handlePaging(current + 1)} className="btn-search col-span-full row-span-full justify-self-end w-[100px]">Next</button>
                : ''
            }
        </div>
    );


}