import Header from "@/widgets/Header/Header";

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Header />
      {children}
      <footer>Footer</footer>
    </>
  );
}
