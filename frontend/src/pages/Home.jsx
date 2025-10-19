import PageContent from "../components/PageContent";

function HomePage() {
  return (
    <>
      <PageContent title="Welcome!">
        <div className="text-center">
          <img className="h-40 m-auto" src="favicon.svg" alt="Empty events" />
          <p>Browse all our amazing events!</p>
        </div>
      </PageContent>
    </>
  );
}

export default HomePage;
