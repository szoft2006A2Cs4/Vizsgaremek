import Footer from "./Footer";
import ArticleAds from "./ArticleAds";
import SectionAds from "./SectionAds";

export default function PseMain(data) {
  return (
    <main>
      <article style={{ overflowY: "none" }}>
        <ArticleAds data={data} />
      </article>
      <section style={{ overflowY: "none" }}>
        <SectionAds />
      </section>
      <Footer />
    </main>
  );
}
