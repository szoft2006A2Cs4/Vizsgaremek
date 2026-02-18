import Footer from "./Footer";
import ArticleAds from "./ArticleAds";

export default function PseMain(data) {
  return (
    <main>
      <article>
        <ArticleAds data={data} />
      </article>
      <section>section</section>
      <Footer />
    </main>
  );
}
