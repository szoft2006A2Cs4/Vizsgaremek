import Footer from "./Footer";
import ArticleAds from "./ArticleAds";

export default function PseMain(data) {
  return (
    <main>
      <article style={{ overflowY: "none" }}>
        <ArticleAds data={data} />
      </article>
      <section>section</section>
      <Footer />
    </main>
  );
}
