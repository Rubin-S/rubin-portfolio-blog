import PageTransition from "@/components/anim/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
    return <PageTransition>{children}</PageTransition>;
}
