import AdminContent from "@/components/pages/AdminContent";

export const metadata = {
  title: "Admin — BauArt Stein & Garten",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="font-body text-ink bg-stone-100 min-h-screen">
      <AdminContent />
    </div>
  );
}
