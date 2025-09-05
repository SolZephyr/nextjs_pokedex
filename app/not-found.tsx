"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {

    const router = useRouter();

    const navBack = () => {
        router.back();
    }

    return (
        <section className="flex flex-col justify-center items-center grow">
            <h4>This page was not found</h4>
            <button onClick={navBack} className="btn-primary">Go back</button>
        </section>
    );
}