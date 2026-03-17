import Footer from "./Footer";
import ArticleAds from "./ArticleAds";
import SectionAds from "./SectionAds";

export default function PseMain({ ins, isLoading }) {
  return (
    <main>
      <article style={{ overflowY: "none" }}>
        <ArticleAds data={ins} isLoading={isLoading} />
      </article>
      <section>
        <SectionAds ins={ins} />
      </section>
      <Footer />
    </main>
  );
}
