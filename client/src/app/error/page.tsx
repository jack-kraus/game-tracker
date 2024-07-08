import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Error | Leveler",
    description: "Sorry, something went wrong"
};

export default function ErrorPage() {
    return <p>Sorry, something went wrong</p>
}