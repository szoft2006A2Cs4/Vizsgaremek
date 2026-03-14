import Footer from "./Footer";
import ArticleAds from "./ArticleAds";
import SectionAds from "./SectionAds";

export default function PseMain({ data, isLoading }) {
  return (
    <main>
      <article style={{ overflowY: "none" }}>
        <ArticleAds data={data} isLoading={isLoading} />
      </article>
      <section>
        <SectionAds />
      </section>
      <Footer />
    </main>
  );
}
